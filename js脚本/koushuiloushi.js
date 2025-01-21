const axios = require('axios');
const cheerio = require('cheerio');
const Segment = require('node-segment').Segment;
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const https = require('https');
const tunnel = require('tunnel');

// 配置
const BASE_URL = 'https://zzhzbbs.zjol.com.cn';
const FORUM_ID = '2';
const PAGES_TO_CRAWL = 1;

// 存储结果的数据结构
let results = {
    posts: [],
    estates: new Map(),
    sentiments: {
        positive: 0,
        negative: 0
    }
};

// 初始化分词器
const segment = new Segment();

// 添加代理配置（如果有代理的话）
const proxyConfig = {
    host: 'bjproxy2.cicc.group',
    port: '8080'
};

// 修改请求配置
const axiosConfig = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
        'Accept-Charset': 'utf-8,gbk;q=0.7,*;q=0.3',  // 添加字符集
        'Connection': 'keep-alive',
        'Referer': 'https://zzhzbbs.zjol.com.cn/',
        'Cookie': '' // 如果需要登录，在这里添加Cookie
    },
    responseType: 'arraybuffer',  // 修改响应类型为 arraybuffer
    timeout: 10000, // 增加超时时间到30秒
    retry: 3,      // 增加重试次数
    retryDelay: 2000, // 增加重试延迟
    httpsAgent: new https.Agent({
        rejectUnauthorized: false, // 忽略SSL证书验证
        keepAlive: true
    }),
    // 如果使用代理，取消下面的注释并配置代理
    httpsAgent: tunnel.httpsOverHttp({
        proxy: proxyConfig
    }),
    validateStatus: function (status) {
        return status >= 200 && status < 300; // 默认只接受2xx的状态码
    }
};

// 添加并发控制配置
const CONCURRENT_REQUESTS = 6; // 同时处理的请求数
const MIN_DELAY = 200; // 最小延迟时间(ms)
const MAX_DELAY = 1000; // 最大延迟时间(ms)

// 添加杭州区域映射
const districtMapping = {
    '钱塘': ['金茂府', '绿城桃李春风', '滨江保利和光尘樾', '万科大都会', '龙湖春江天玺', '招商雍景湾'],
    '上城': ['绿城江南里', '融创武林壹号', '万科璞悦风华', '金地天逸', '中海钱江湾', '华润万象城'],
    '拱墅': ['绿城运河宸园', '金科博翠天宸', '万科大运河府', '保利天珺', '招商运河公馆', '龙湖春江郦城'],
    '西湖': ['绿城西溪诚园', '万科西溪望府', '融创西溪宸院', '保利西湖大道', '龙湖天璞', '金成武林郡'],
    '滨江': ['绿城江南云栖', '万科江语海', '融创东南海', '保利滨江天地', '龙湖天钜', '招商江湾城'],
    '萧山': ['绿城明月江南', '万科未来城', '融创观澜府', '保利城', '龙湖春江彼岸', '金地天逸'],
    '余杭': ['绿城桃李春风', '万科良渚文化村', '融创未来城', '保利东湾', '龙湖天璞', '招商雍和府'],
    '富阳': ['绿城富春和园', '万科大都会', '融创东方壹号', '保利天珺', '龙湖天钜', '金成江南府'],
    '临平': ['绿城运河新城', '万科城市之光', '融创望江府', '保利城', '龙湖天璞', '招商雍景湾']
};

// 修改重试机制
async function axiosWithRetry(url, config = {}) {
    const maxRetries = config.retry || axiosConfig.retry;
    const retryDelay = config.retryDelay || axiosConfig.retryDelay;
    
    for (let i = 0; i < maxRetries; i++) {
        try {
            // 减少随机延迟时间
            const randomDelay = Math.floor(Math.random() * (MAX_DELAY - MIN_DELAY)) + MIN_DELAY;
            await new Promise(resolve => setTimeout(resolve, randomDelay));
            
            const response = await axios.get(url, { ...axiosConfig, ...config });
            
            if (response.data && response.data.includes('访问太频繁')) {
                throw new Error('访问频率限制');
            }
            
            return response;
        } catch (error) {
            console.error(`第 ${i + 1} 次请求失败:`, error.message);
            
            if (error.message.includes('访问频率限制')) {
                await new Promise(resolve => setTimeout(resolve, 3000)); // 减少等待时间
            }
            
            if (i === maxRetries - 1) throw error;
            await new Promise(resolve => setTimeout(resolve, retryDelay));
        }
    }
}

// 初始化分词器
const initializeSegment = () => {
    // 使用默认的词典
    segment.useDefault();
    
    // 添加自定义词典
    const estates = [
        // 钱塘区
        "金茂府", "绿城桃李春风", "滨江保利和光尘樾", "万科大都会", "龙湖春江天玺", "招商雍景湾",
        
        // 上城区
        "绿城江南里", "融创武林壹号", "万科璞悦风华", "金地天逸", "中海钱江湾", "华润万象城",
        
        // 拱墅区
        "绿城运河宸园", "金科博翠天宸", "万科大运河府", "保利天珺", "招商运河公馆", "龙湖春江郦城",
        
        // 西湖区
        "绿城西溪诚园", "万科西溪望府", "融创西溪宸院", "保利西湖大道", "龙湖天璞", "金成武林郡",
        
        // 滨江区
        "绿城江南云栖", "万科江语海", "融创东南海", "保利滨江天地", "龙湖天钜", "招商江湾城",
        
        // 萧山区
        "绿城明月江南", "万科未来城", "融创观澜府", "保利城", "龙湖春江彼岸", "金地天逸",
        
        // 余杭区
        "绿城桃李春风", "万科良渚文化村", "融创未来城", "保利东湾", "龙湖天璞", "招商雍和府",
        
        // 富阳区
        "绿城富春和园", "万科大都会", "融创东方壹号", "保利天珺", "龙湖天钜", "金成江南府",
        
        // 临平区
        "绿城运河新城", "万科城市之光", "融创望江府", "保利城", "龙湖天璞", "招商雍景湾",
        
        // 其他知名楼盘
        "杭州之门", "阿里巴巴园区", "华盛达大厦", "恒基旭辉府", "中南春溪集", "金地天逸",
        "华润万象城", "绿城云栖玫瑰园", "滨江保利翡翠海岸", "万科良渚文化村",
        "绿城桃李春风", "融创杭州壹号院", "龙湖春江天玺", "招商雍景湾",
        "绿城江南里", "万科璞悦风华", "保利天汇", "金地天逸",
        "绿城运河宸园", "万科大运河府", "融创运河宸院", "保利天珺",
        
        // 高端楼盘
        "绿城云栖玫瑰园", "杭州之门", "融创东南海", "万象城", "钱江新城", "武林壹号",
        "绿城江南里", "万科良渚文化村", "保利钱江新城", "龙湖天街", "招商雍景湾",
        
        // 新建楼盘
        "绿城春月锦庐", "万科未来城", "融创观澜府", "保利城市之光", "龙湖天钜",
        "金地天逸", "华润万象汇", "招商雍和府", "恒基旭辉府", "中南春溪集",
        
        // 热门小区
        "采荷人家", "西溪花园", "金都花园", "翠苑一区", "古荡新村", "文三新村",
        "嘉绿苑", "紫金观巷", "求是村", "文新小区", "长庆街", "和睦新村",
        
        // 知名社区
        "黄龙万科", "西湖国际", "城西银泰", "庆春银泰", "湖滨银泰", "武林银泰",
        "天城国际", "钱江国际", "城站国际", "运河国际", "钱江新城CBD", "武林商圈",
        
        // 特色楼盘
        "运河上街", "南宋御街", "湖滨银泰", "西溪银泰", "天街", "万象城",
        "湖滨银泰", "西溪银泰", "城西银泰", "庆春银泰", "下沙银泰", "萧山银泰",
        
        // 综合体
        "杭州来福士", "西湖银泰城", "万象城", "银隆百货", "西溪印象城", "龙湖天街",
        "滨江宝龙城", "萧山宝龙城", "杭州大厦", "湖滨银泰", "西溪银泰", "城西银泰"
    ];
    // 创建临时词典文件
    const customDict = estates.map(estate => `${estate} 10 n`).join('\n');
    const dictPath = path.join(__dirname, 'custom_dict.txt');
    fs.writeFileSync(dictPath, customDict, 'utf8');
    
    // 使用绝对路径加载自定义词典文件
    try {
        segment.loadDict(dictPath, 'DICT_CUSTOM');
    } catch (error) {
        console.warn('加载自定义词典失败:', error.message);
        // 继续执行，使用默认词典
    }
};

// 修改分词的调用方式
const getWords = (text) => {
    return segment.doSegment(text, {
        simple: true
    });
};

// 简单的情感分析函数
const analyzeSentiment = (text) => {
    const positiveWords = [
        '好', '优秀', '满意', '推荐', '漂亮', '赞', '棒', '不错', '给力', '值得',
        '喜欢', '舒适', '便利', '实惠', '划算', '升值', '潜力', '宜居', '环境好',
        '配套齐全', '交通便利', '学区房', '性价比高', '品质', '优质', '放心',
        '安心', '靠谱', '大气', '高端', '豪华', '精装', '地段好', '升值空间'
    ];
    
    const negativeWords = [
        '差', '烂', '失望', '问题', '投诉', '坑', '贵', '亏', '后悔', '垃圾',
        '噪音', '拥挤', '偏僻', '远', '黑心', '忽悠', '骗', '差评', '不值',
        '维权', '纠纷', '质量差', '物业差', '物业费贵', '停车难', '交通堵',
        '配套少', '学区差', '环境差', '治安差', '物价贵', '升值慢', '跌价',
        '开发商', '延期交房', '违约', '缺陷', '漏水', '渗水', '裂缝'
    ];
    
    let score = 0;
    positiveWords.forEach(word => {
        if (text.includes(word)) score++;
    });
    negativeWords.forEach(word => {
        if (text.includes(word)) score--;
    });
    
    return score > 0 ? 'positive' : score < 0 ? 'negative' : 'neutral';
};

// 修改获取帖子列表函数
async function getThreadList(page) {
    try {
        const url = `${BASE_URL}/forum-${FORUM_ID}-${page}.html`;
        const response = await axiosWithRetry(url);
        
        const contentType = response.headers['content-type'];
        const charset = contentType && contentType.includes('charset=') 
            ? contentType.split('charset=')[1] 
            : 'gbk';
            
        const decodedData = new TextDecoder(charset).decode(response.data);
        const $ = cheerio.load(decodedData);
        
        const threads = [];
        // 修改选择器以匹配论坛帖子列表
        $('#threadlisttableid tbody[id^="normalthread_"]').each((_, element) => {
            const $element = $(element);
            const threadLink = $element.find('th.new a.xst, th.common a.xst');  // 同时匹配新帖和普通帖子
            
            if (threadLink.length) {
                const href = threadLink.attr('href');
                const threadId = $element.attr('id').split('_')[1];
                if (threadId) {
                    const thread = {
                        id: threadId,
                        title: threadLink.text().trim(),
                        url: href.startsWith('http') ? href : `${BASE_URL}/${href}`,
                        author: $element.find('td.by cite a').first().text().trim(),
                        postTime: $element.find('td.by em span').first().text().trim(),
                        replyCount: parseInt($element.find('td.num a').text().trim()) || 0,
                        viewCount: parseInt($element.find('td.num em').text().trim()) || 0
                    };
                    
                    threads.push(thread);
                }
            }
        });
        
        console.log(`第 ${page} 页找到 ${threads.length} 个帖子`);
        return threads;
    } catch (error) {
        console.error(`获取帖子列表失败: ${error.message}`);
        throw error; // 向上传递错误，让主函数处理
    }
}

// 修改获取帖子详情函数
async function getThreadDetail(thread) {
    try {
        const response = await axiosWithRetry(thread.url);
        
        // 检测并转换编码
        const contentType = response.headers['content-type'];
        const charset = contentType && contentType.includes('charset=') 
            ? contentType.split('charset=')[1] 
            : 'gbk';  // 默认使用 GBK 编码
            
        const decodedData = new TextDecoder(charset).decode(response.data);
        const $ = cheerio.load(decodedData);
        
        const posts = [];
        $('#postlist table[id^="pid"]').each((index, element) => {
            const $post = $(element);
            const author = $post.find('.authi a.xw1').first().text().trim();
            const postTime = $post.find('em[id^="authorposton"]').first().text().trim().replace('发表于 ', '');
            const content = $post.find('.t_f').text().trim();
            
            if (content) {  // 只处理非空内容
                const words = getWords(content);
                const sentiment = analyzeSentiment(content);
                
                const estates = words.filter(word => 
                    word.length >= 2 && 
                    (word.includes('园') || word.includes('府') || word.includes('城') || 
                     word.includes('湾') || word.includes('苑') || word.includes('广场'))
                );
                
                // 更新每个楼盘的统计信息
                estates.forEach(estate => {
                    if (!results.estates.has(estate)) {
                        results.estates.set(estate, {
                            positive: 0,
                            negative: 0,
                            comments: []
                        });
                    }
                    const estateStats = results.estates.get(estate);
                    if (sentiment === 'positive') estateStats.positive++;
                    if (sentiment === 'negative') estateStats.negative++;
                    estateStats.comments.push({
                        content: content,
                        sentiment: sentiment,
                        postTime: postTime
                    });
                });
                
                posts.push({
                    author: author,
                    postTime: postTime,
                    content: content,
                    sentiment: sentiment,
                    estates: estates
                });
                
                if (sentiment === 'positive') results.sentiments.positive++;
                if (sentiment === 'negative') results.sentiments.negative++;
            }
        });
        
        console.log(`帖子 ${thread.id} 获取到 ${posts.length} 条回复`);
        return {
            ...thread,
            posts: posts
        };
    } catch (error) {
        console.error(`获取帖子详情失败 ${thread.id}: ${error.message}`);
        return null;
    }
}

// 修改主函数使用并发请求
async function main() {
    initializeSegment();
    
    for (let page = 1; page <= PAGES_TO_CRAWL; page++) {
        console.log(`正在爬取第 ${page} 页`);
        try {
            const threads = await getThreadList(page);
            
            if (threads.length === 0) {
                console.log(`第 ${page} 页没有找到帖子，等待10秒后继续...`);
                await new Promise(resolve => setTimeout(resolve, 10000));
                continue;
            }
            
            // 使用 Promise.all 和 Array.slice 进行并发控制
            for (let i = 0; i < threads.length; i += CONCURRENT_REQUESTS) {
                const batch = threads.slice(i, i + CONCURRENT_REQUESTS);
                const threadDetails = await Promise.all(
                    batch.map(thread => getThreadDetail(thread))
                );
                
                results.posts.push(...threadDetails.filter(detail => detail !== null));
                
                // 批次间短暂延迟
                await new Promise(resolve => setTimeout(resolve, MIN_DELAY));
            }
            
            // 每页之间的延迟
            const pageDelay = 5000 + Math.random() * 5000;
            await new Promise(resolve => setTimeout(resolve, pageDelay));
            
        } catch (error) {
            console.error(`处理第 ${page} 页时发生错误:`, error.message);
            await new Promise(resolve => setTimeout(resolve, 30000));
        }
    }
    
    // 处理每个楼盘的评论，添加区域信息
    const processedEstates = Array.from(results.estates.entries()).map(([name, stats]) => {
        // 查找楼盘所属区域
        let district = '未知';
        for (const [dist, estates] of Object.entries(districtMapping)) {
            if (estates.some(estate => name.includes(estate))) {
                district = dist;
                break;
            }
        }

        // 按评论长度排序，长评论可能包含更多有价值的信息
        const sortedComments = stats.comments
            .sort((a, b) => b.content.length - a.content.length)
            .slice(0, 3);

        return {
            name,
            district, // 添加区域信息
            positive: stats.positive,
            negative: stats.negative,
            topComments: sortedComments
        };
    });

    // 按区域统计结果
    const districtStats = {};
    processedEstates.forEach(estate => {
        if (!districtStats[estate.district]) {
            districtStats[estate.district] = {
                estateCount: 0,
                positive: 0,
                negative: 0
            };
        }
        districtStats[estate.district].estateCount++;
        districtStats[estate.district].positive += estate.positive;
        districtStats[estate.district].negative += estate.negative;
    });

    // 保存结果
    await fsPromises.writeFile('results.json', JSON.stringify({
        posts: results.posts,
        estates: processedEstates,
        sentiments: results.sentiments,
        districtStats: districtStats // 添加区域统计
    }, null, 2), 'utf8');
    
    console.log('爬取完成！结果已保存到 results.json');
    console.log(`发现楼盘数量: ${results.estates.size}`);
    console.log(`正面评论数: ${results.sentiments.positive}`);
    console.log(`负面评论数: ${results.sentiments.negative}`);
}

// 运行程序
main().catch(console.error);