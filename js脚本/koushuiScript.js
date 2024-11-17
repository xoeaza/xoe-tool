const axios = require('axios');
const cheerio = require('cheerio');
const nodejieba = require('nodejieba');
const fs = require('fs');

// 定义爬取函数
async function crawlForumPages(totalPages) {
    let allPosts = [];
    
    for(let page = 1; page <= totalPages; page++) {
        try {
            // 爬取列表页
            const listUrl = `https://zzhzbbs.zjol.com.cn/forum-list-${page}.html`;
            const listResponse = await axios.get(listUrl);
            const $ = cheerio.load(listResponse.data);
            
            // 获取帖子链接
            const postLinks = $('.post-title a').map((i, el) => $(el).attr('href')).get();
            
            // 爬取每个帖子详情
            for(const link of postLinks) {
                const postUrl = `https://zzhzbbs.zjol.com.cn${link}`;
                const postResponse = await axios.get(postUrl);
                const post$ = cheerio.load(postResponse.data);
                
                // 获取帖子内容
                const title = post$('.post-title').text().trim();
                const content = post$('.post-content').text().trim();
                
                // 获取回复
                const replies = post$('.reply-item').map((i, el) => {
                    return {
                        content: post$(el).find('.reply-content').text().trim(),
                        time: post$(el).find('.reply-time').text().trim()
                    };
                }).get();
                
                allPosts.push({
                    title,
                    content,
                    replies
                });
            }
            
            console.log(`完成第${page}页爬取`);
            
            // 避免请求过快
            await new Promise(resolve => setTimeout(resolve, 1000));
            
        } catch(err) {
            console.error(`爬取第${page}页时出错:`, err);
        }
    }
    
    return allPosts;
}

// 情感分析函数
function analyzeSentiment(text) {
    // 分词
    const words = nodejieba.cut(text);
    
    // 简单的情感词典
    const positiveWords = ['好','优秀','漂亮','满意','推荐','赞','给力','不错','棒'];
    const negativeWords = ['差','烂','失望','坑','贵','问题','垃圾','后悔','不好'];
    
    let positiveScore = 0;
    let negativeScore = 0;
    
    words.forEach(word => {
        if(positiveWords.includes(word)) positiveScore++;
        if(negativeWords.includes(word)) negativeScore++;
    });
    
    return positiveScore > negativeScore ? 'positive' : 'negative';
}

// 主函数
async function main() {
    // 爬取200页
    const posts = await crawlForumPages(200);
    
    // 分析回复情感
    const analyzedReplies = [];
    posts.forEach(post => {
        post.replies.forEach(reply => {
            analyzedReplies.push({
                content: reply.content,
                sentiment: analyzeSentiment(reply.content)
            });
        });
    });
    
    // 统计结果
    const positiveReplies = analyzedReplies.filter(r => r.sentiment === 'positive');
    const negativeReplies = analyzedReplies.filter(r => r.sentiment === 'negative');
    
    // 保存结果
    fs.writeFileSync('analysis_results.json', JSON.stringify({
        totalReplies: analyzedReplies.length,
        positiveCount: positiveReplies.length,
        negativeCount: negativeReplies.length,
        positiveReplies,
        negativeReplies
    }, null, 2));
    
    console.log('分析完成，结果已保存到 analysis_results.json');
}

main().catch(console.error);
