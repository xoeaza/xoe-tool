const request = require('request');
const fs = require('fs');
const path = require('path');
const url = require('url');
const chalk = require('chalk');
const file = 'public/public.json';

const allListJson = JSON.parse(fs.readFileSync(file));
const uidArr = allListJson.data.map(item => item.uid);
const ImgArr = [];

// cookie
const cookie = request.cookie(
  'bane_ticket=5ed6b5c5a56c773572a0f13a43f972b30002003508000;'
);

// 存储下载图片的地址
const storeDownLoadImgFile = 'imgs2';

// 数组扁平化
const flatten = (arr, depth = 1) =>
  arr.reduce(
    (a, v) =>
      a.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth - 1) : v),
    []
  );

// 返回对应uid的图片
const getIdCardUrls = async (params = {}) => {
  const { uid = '639247268527871173' } = params;
  const options = {
    url: `https://www.xxx.com/api/?uid=${uid}`,
    headers: {
      'User-Agent': 'request',
      Cookie: cookie
    }
  };
  const result = await new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        const info = JSON.parse(body);
        const { idCardPicFrontUrl, idCardPicBackUrl } = info.data;
        resolve([idCardPicFrontUrl, idCardPicBackUrl]);
      }
    });
  });
  return result;
};

// 返回待下载的图片arr
const getImgUrlsArr = async () => {
  let imgUrlsArr = [];
  const results = await Promise.all(
    uidArr.map(async uid => {
      const cardUrls = await getIdCardUrls({ uid });
      return cardUrls;
    })
  );
  imgUrlsArr = flatten(results, 1);
  return imgUrlsArr;
};

// ===========================下载图片
// 创建目录
function mkdir(dirname) {
  if (fs.existsSync(dirname)) {
    return true
  } else {
    if (mkdir(path.dirname(dirname))) {
      fs.mkdirSync(dirname)
      return true
    }
  }
  return false
}

// 下载单张图片
async function download(url, dir, filename) {
  await new Promise((resolve, reject) => {
    request.head(url, function(err) {
      if (err) reject(url + err)
      if (mkdir(dir)) {
        request(url)
          .pipe(fs.createWriteStream(dir + '/' + filename + '.jpg'))
          .on('close', function() {
            console.log(chalk.green(url, '下载成功'))
            resolve()
          })
      }
    })
  })
}

// 下载图片列表
async function downloadFinish(downLoadLists) {
  let failedImg = []
  try {
    await Promise.all(
      downLoadLists.map(async (item, index, arr) => {
        let fileName = url.parse(item).pathname.replace(/\//g, '')
        const filePath = `./${storeDownLoadImgFile}`
        await download(item, filePath, fileName)
      })
    )
  } catch (e) {
    if (e) {
      console.log(chalk.red(e))
      failedImg.push(e)
    }
  }
}

const workFlow = async () => {
  const imgUrlArr = await getImgUrlsArr()
  await downloadFinish(imgUrlArr)
}

workFlow()
