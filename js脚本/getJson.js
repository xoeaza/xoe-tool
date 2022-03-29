const axios = require('axios')
const request = require('request')
const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const storeDownLoadJsonFile = 'downLoadJson'
const jsonFormat = require('json-format')

const dowLoadUrl =
  'www.xxx.com'
let Num = 8

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

const flatten = (arr, depth = 1) =>
  arr.reduce(
    (a, v) =>
      a.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth - 1) : v),
    []
  )

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

function downLoad(num) {
  const service = axios.create({
    baseURL: '',
    timeout: 10000
  })
  return service({
    url: `${dowLoadUrl}/${num}`,
    method: 'get',
    responseType: 'blob'
  })
}

function downLoadFlow() {
  while (Num) {
    const filePath = `./${storeDownLoadJsonFile}`
    download(`${dowLoadUrl}/${Num}`, filePath, `${Num}.json`)
    Num--
  }
}

function format(jsonFile) {
  let file = fs.readFileSync(jsonFile)
  console.log(file)
  fs.writeFile(jsonFile, jsonFormat(file), function(err) {})
}

function mergeJson() {
  let resultData = []
  const files = fs.readdirSync(storeDownLoadJsonFile)
  const reg = /\.json$/
  for (let file of files) {
    if (reg.test(file)) {
      const allListJson = fs.readFileSync(
        path.join(storeDownLoadJsonFile, file)
      )
      resultData.push(allListJson)
    }
  }
  resultData = flatten(resultData)
  console.log(resultData)
  const newFile = path.join(storeDownLoadJsonFile, 'map.json')
  fs.writeFile(newFile, resultData, () => {
    let FileSize = fs.statSync(newFile).size
    console.log(chalk.green(`${FileSize}`))
  })
  // format(newFile)
}

// mergeJson()

downLoadFlow()
