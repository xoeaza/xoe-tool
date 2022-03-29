const path = require('path')
const fs = require('fs')
const url = require('url')
const request = require('request')
const file = 'public/truck_list.json'
const tinify = require('tinify')
tinify.key = 'eVlmdqRD6CSj5Dy5U8J5yuVhI0rDFvXf'
const chalk = require('chalk')
const allListJson = JSON.parse(fs.readFileSync(file))
// 存储下载图片的地址
const storeDownLoadImgFile = 'imgs2'

// 获取需要更新的图片链接地址
let urlArr = []
allListJson.forEach(item => {
  if (item.url.length > 0) {
    // 需要更新的链接
    let oldUrlArr = item.url.filter(item => {
      return !item.includes('www.xxx.com')
    })
    urlArr = urlArr.concat(oldUrlArr)
  }
})
console.log(chalk.green('需要下载的图片数量' + urlArr.length))

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

async function download(url, dir, filename) {
  await new Promise((resolve, reject) => {
    request.head(url, function(err) {
      if (err) reject(url + err)
      if (mkdir(dir)) {
        request(url)
          .pipe(fs.createWriteStream(dir + '/' + filename))
          .on('close', function() {
            console.log(chalk.green(url, '下载成功'))
            resolve()
          })
      }
    })
  })
}

async function compress() {
  const files = fs.readdirSync(storeDownLoadImgFile)
  const reg = /\.(jpg|png)$/
  for (let file of files) {
    let filePathAll = path.join(storeDownLoadImgFile, file)
    let stats = fs.statSync(path.join(storeDownLoadImgFile, file))
    if (!stats.isDirectory() && reg.test(file)) {
      await new Promise((resolve, reject) => {
        fs.readFile(filePathAll, (err, sourceData) => {
          if (err) {
            console.log(chalk.red(`${file} 压缩失败`))
            reject(err)
          } else {
            let fileSize = fs.statSync(filePathAll).size
            tinify.fromBuffer(sourceData).toBuffer((err, resultData) => {
              if (err) {
                console.log(chalk.red(`${file} 压缩失败`))
                reject(err)
              }
              //将压缩后的文件保存覆盖
              fs.writeFile(filePathAll, resultData, () => {
                let compressFileSize = fs.statSync(filePathAll).size
                console.log(
                  chalk.green(
                    `${file} ${(fileSize / 1024).toFixed(2)}kb 压缩成功 ${(
                      compressFileSize / 1024
                    ).toFixed(2)}kb ${(
                      ((compressFileSize - fileSize) * 100) /
                      fileSize
                    ).toFixed(1)}%`
                  )
                )
                resolve()
              })
            })
          }
        })
      })
    }
  }
}

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

async function upload(fileName) {
  let newImgHref = ''
  const formData = {
    file: fs.createReadStream(fileName)
  }
  const options = {
    url: 'www.xxx.com',
    headers: {
      'Content-Type': 'multipart/form-data',
      'x-auth-token': '******'
    },
    formData: formData
  }
  await new Promise((resolve, reject) => {
    request.post(options, function optionalCallback(err, httpResponse, res) {
      if (err) {
        reject('上传失败：', err)
      }
      // console.log('Upload successful!  Server responded with:', res)
      const {
        data: { url }
      } = JSON.parse(res)
      newImgHref = url
      resolve(newImgHref)
      console.log(chalk.green('上传成功！获得新图片链接：' + newImgHref))
    })
  })
  return newImgHref
}

const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  )

// TODO 目前基于上传服务性能，每次传30张，需要自行修改chunkfile[1]的下标值
async function getNewImgHash() {
  const files = fs.readdirSync(storeDownLoadImgFile)
  let chunkfile = chunk(files, 30)
  let hash = {}
  for (let file of chunkfile[0]) {
    const itemPath = path.resolve(
      __dirname,
      `../../${storeDownLoadImgFile}`,
      file
    )
    const newImgUrl = await upload(itemPath)
    hash[file] = newImgUrl
  }
  console.log(chalk.green('hash表创建成功：', hash))
  return hash
}

function updateJsonFile(hash) {
  allListJson.forEach(item => {
    if (item.url.length > 0) {
      let imgArr = item.url
      imgArr.map((imgUrl, index) => {
        let key = url.parse(imgUrl).pathname.replace(/\//g, '')
        if (hash[key]) {
          console.log(
            'json中旧链接：' +
              imgArr[index] +
              ' 将替换为：' +
              chalk.green(hash[key])
          )
          imgArr[index] = hash[key]
        }
      })
    }
  })
  try {
    const UpdateAllListJson = JSON.stringify(allListJson)
    fs.writeFileSync(file, UpdateAllListJson)
    console.log(chalk.green('更新alllist.json 成功'))
  } catch (e) {
    if (e) console.log(chalk.red('更新alllist.json 失败'))
  }
}

function delDir(path) {
  let files = []
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path)
    files.forEach((file, index) => {
      let curPath = path + '/' + file
      if (fs.statSync(curPath).isDirectory()) {
        delDir(curPath)
      } else {
        fs.unlinkSync(curPath)
      }
    })
    fs.rmdirSync(path)
  }
}

async function workFlow() {
  // 为保证下载和上传过程的稳定性，目前建议按步进行。
  // 第一步
  await downloadFinish(urlArr)
  // 第二步
  await compress()
  // 第三步
  const urlHash = await getNewImgHash()
  updateJsonFile(urlHash)
  // delDir(storeDownLoadImgFile)
}

// 触发生成图片
function triggerImgBuild() {
  let needTriggerArr = []
  allListJson.forEach(item => {
    if (!item.url.length) return
    const oldUrlArr = item.url.filter(item => {
      return item.includes('www.xxx.com')
    })
    needTriggerArr = needTriggerArr.concat(oldUrlArr)
  })
  console.log(chalk.green('需要触发更新的图片数量' + needTriggerArr.length))
  try {
    needTriggerArr.forEach((item, index) => {
      item = item.replace(
        'www.xxx.com',
        'www.xxx.com'
      )
      let url1 = item.split('.jpg')[0] + '_w345h258.jpg'
      let url2 = item.split('.jpg')[0] + '_w730h500.jpg'
      let urlArr = [url1, url2]
      urlArr.forEach(url => {
        request(url, function(error, response, body) {
          if (error) console.error('error:', error)
          console.log(index + 'statusCode:', response && response.statusCode)
        })
      })
    })
  } catch (e) {
    console.error(e)
  }
}

// workFlow()
// delDir(storeDownLoadImgFile)
triggerImgBuild()
