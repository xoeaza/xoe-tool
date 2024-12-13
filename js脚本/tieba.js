// 需要安装以下npm包：
// npm install axios cheerio docx fs puppeteer

const axios = require('axios');
const cheerio = require('cheerio');
const { Document, Packer, Paragraph, ImageRun, TextRun, AlignmentType, SectionType } = require('docx');
const fs = require('fs');
const puppeteer = require('puppeteer');

async function processImage(imgUrl, url) {
    try {
        const imgResponse = await axios({
            method: 'get',
            url: imgUrl,
            responseType: 'arraybuffer',
            timeout: 30000,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Referer': url
            }
        });

        // 确保图片数据有效
        if (!imgResponse.data || !Buffer.isBuffer(imgResponse.data) || imgResponse.data.length === 0) {
            throw new Error('Invalid image data');
        }

        // 获取图片尺寸
        const sizeOf = require('image-size');
        const dimensions = sizeOf(imgResponse.data);
        
        // 计算新的尺寸，保持宽高比
        const maxWidth = 500; // 最大宽度
        let width = dimensions.width;
        let height = dimensions.height;
        
        if (width > maxWidth) {
            const ratio = maxWidth / width;
            width = maxWidth;
            height = Math.round(height * ratio);
        }

        // 创建一个新的段落，包含图片
        return new Paragraph({
            children: [
                new ImageRun({
                    data: imgResponse.data,
                    transformation: {
                        width,
                        height
                    },
                    altText: {
                        title: "Tieba Image",
                        description: "Image from Tieba post",
                    }
                })
            ],
            spacing: { before: 200, after: 200 }
        });
    } catch (error) {
        console.error(`图片处理失败: ${imgUrl}`, error.message);
        return null;
    }
}

async function getTiebaContent() {
    const baseUrl = 'https://tieba.baidu.com/p/9101556592?see_lz=1';
    let browser = null;
    let page = null;

    try {
        const contents = [
            new Paragraph({
                children: [
                    new TextRun({
                        text: "坐禅2-次世代版终极佛法",
                        bold: true,
                        size: 32,
                    }),
                ],
                spacing: { after: 400 },
                alignment: AlignmentType.CENTER,
            })
        ];

        // 初始化浏览器
        browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--disable-gpu',
                '--window-size=1920,1080',
                '--disable-web-security',
                '--disable-features=IsolateOrigins,site-per-process'
            ],
            defaultViewport: {
                width: 1920,
                height: 1080
            }
        });
        
        // 创建新页面
        page = await browser.newPage();
        
        // 设置请求拦截
        await page.setRequestInterception(true);
        
        page.on('request', (request) => {
            const resourceType = request.resourceType();
            if (['document', 'image'].includes(resourceType)) {
                request.continue();
            } else {
                request.abort();
            }
        });

        await page.setExtraHTTPHeaders({
            'Accept-Language': 'zh-CN,zh;q=0.9',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Connection': 'keep-alive',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
        });
        
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

        function formatText(text) {
            return text
                .replace(/\s+/g, ' ')
                .replace(/\n\s*\n/g, '\n')
                .split('\n')
                .filter(line => line.trim());
        }

        async function processPage(pageUrl, contents, baseUrl) {
            console.log(`正在处理页面: ${pageUrl}`);
            
            await page.goto(pageUrl, {
                waitUntil: 'domcontentloaded',
                timeout: 30000
            });

            await page.waitForSelector('.d_post_content', {
                timeout: 30000,
                visible: true
            });

            const content = await page.content();
            const $ = cheerio.load(content);
            
            const posts = $('.d_post_content.j_d_post_content');
            
            for (let i = 0; i < posts.length; i++) {
                const post = $(posts[i]);
                const text = post.html()
                    .replace(/<br\s*\/?>/gi, '\n')
                    .replace(/<[^>]*>/g, '')
                    .trim();

                if (text) {
                    contents.push(
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: `帖子 #${i + 1}`,
                                    bold: true,
                                    size: 28,
                                })
                            ],
                            spacing: { before: 400, after: 200 }
                        })
                    );

                    const lines = formatText(text);
                    lines.forEach(line => {
                        contents.push(
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: line,
                                        size: 24,
                                    })
                                ],
                                spacing: { before: 120, after: 120 },
                                indent: { firstLine: 480 }
                            })
                        );
                    });
                }

                const images = post.find('img[src^="http"]');
                if (images.length > 0) {
                    for (let j = 0; j < images.length; j++) {
                        const imgUrl = $(images[j]).attr('src');
                        if (imgUrl) {
                            const imageParagraph = await processImage(imgUrl, baseUrl);
                            if (imageParagraph) {
                                contents.push(imageParagraph);
                            }
                        }
                    }
                }
            }
        }

        await page.goto(baseUrl, {
            waitUntil: 'domcontentloaded',
            timeout: 30000
        });
        const firstPageContent = await page.content();
        const $ = cheerio.load(firstPageContent);
        const totalPages = parseInt($('.l_reply_num .red').last().text()) || 1;
        
        console.log(`总页数: ${totalPages}`);

        for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
            const pageUrl = `${baseUrl}&pn=${pageNum}`;
            await processPage(pageUrl, contents, baseUrl);
        }

        const doc = new Document({
            sections: [{
                properties: {
                    type: SectionType.CONTINUOUS,
                    page: {
                        margin: {
                            top: 1440,
                            right: 1800,
                            bottom: 1440,
                            left: 1800,
                        },
                    },
                },
                children: contents.filter(content => content !== null)
            }]
        });

        const buffer = await Packer.toBuffer(doc);
        const timestamp = new Date().getTime();
        const fileName = `贴吧内容_${timestamp}.docx`;
        fs.writeFileSync(fileName, buffer);
        console.log(`文档已保存为: ${fileName}`);

    } catch (error) {
        console.error('获取内容失败:', error);
    } finally {
        if (page) {
            await page.close();
        }
        if (browser) {
            await browser.close();
            console.log('浏览器已关闭');
        }
    }
}

getTiebaContent().catch(console.error);
