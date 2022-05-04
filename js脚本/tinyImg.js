//使用tinify压缩图片
import path from 'path'
import fs from 'fs'
import chalk from 'chalk'
import tinify from 'tinify'

// 可于https://tinypng.com/developers申请
// https://www.linshi-email.com/ 临时邮箱
tinify.key = 'nGDGRKLBWbtJ32PwQ82lGjgzvddnwjHx'
const filePath = 'uploads/allimg/'
const files = fs.readdirSync(filePath)
const reg = /\.(jpg|png|jpeg)$/
console.log(chalk.yellow(`上传TinyPNG中...`))

const chunk = (arr, size) => Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => arr.slice(i * size, i * size + size))

async function compress(filePath, files) {
  const arr = chunk(files, 20)

  for (let chunk of arr) {
    await Promise.allSettled(
      chunk.map(async file => {
        let filePathAll = path.join(filePath, file)
        let stats = fs.statSync(filePathAll)
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
                    console.log(chalk.green(`${filePathAll} ${file} ${(fileSize / 1024).toFixed(2)}kb 压缩成功 ${(compressFileSize / 1024).toFixed(2)}kb ${(((compressFileSize - fileSize) * 100) / fileSize).toFixed(1)}%`))
                    resolve()
                  })
                })
              }
            })
          })
        } else if (stats.isDirectory() && file.startsWith('19')) {
          const fileList = fs.readdirSync(`${filePath}${file}/`)
          console.log(fileList, fileList.length, '===>fileList')
          await compress(`${filePath}${file}/`, fileList)
        }
      })
    )
  }
}

compress(filePath, files)
