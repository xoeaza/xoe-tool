// 获取文件base64编码
/**
 * @param file
 * @param format  指定文件格式
 * @param size  指定文件大小(字节)
 * @param formatMsg 格式错误提示
 * @param sizeMsg   大小超出限制提示
 * @returns {Promise<any>}
 */
export function fileToBase64String(file, format = ['jpg', 'jpeg', 'png', 'gif'], size = 20 * 1024 * 1024, formatMsg = '文件格式不正确', sizeMsg = '文件大小超出限制') {
  return new Promise((resolve, reject) => {
    // 格式过滤
    let suffix = file.type.split('/')[1].toLowerCase()
    let inFormat = false
    for (let i = 0; i < format.length; i++) {
      if (suffix === format[i]) {
        inFormat = true
        break
      }
    }
    if (!inFormat) {
      reject(formatMsg)
    }
    // 大小过滤
    if (file.size > size) {
      reject(sizeMsg)
    }
    // 转base64字符串
    let fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = () => {
      let res = fileReader.result
      resolve({ base64String: res, suffix: suffix })
      reject('异常文件，请重新选择')
    }
  })
}

// base64转file
/**
 *  @param { base64 } base64
 *  @param { string } filename 转换后的文件名
 */
export const base64ToFile = (base64, filename) => {
  let arr = base64.split(',')
  let mime = arr[0].match(/:(.*?);/)[1]
  let suffix = mime.split('/')[1] // 图片后缀
  let bstr = atob(arr[1])
  let n = bstr.length
  let u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], `${filename}.${suffix}`, { type: mime })
}

// base64转blob
/**
 *  @param { base64 } base64
 */
export const base64ToBlob = base64 => {
  let arr = base64.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}
