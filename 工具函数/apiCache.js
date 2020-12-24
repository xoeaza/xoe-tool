class ItemCache {
  constructor (data, timeout) {
    this.data = data
    this.timeout = timeout
    this.cacheTime = (new Date()).getTime
  }
}

class ExpriesCache {
  static cacheMap = new Map()

  static isOverTime (name) {
    const data = ExpriesCache.cacheMap.get(name)

    // 没有数据 当超时处理
    if (!data) return true
    const currentTime = (new Date()).getTime()
    const overTime = (currentTime - data.cacheTime) / 1000
    if (Math.abs(overTime) > data.timeout) {
      ExpriesCache.cacheMap.delete(name)
      return true
    }

    return false
  }

  static delete (name) {
    return ExpriesCache.cacheMap.delete(name)
  }

  static get (name) {
    const isDataOverTiem = ExpriesCache.isOverTime(name)
    return isDataOverTiem ? null : ExpriesCache.cacheMap.get(name).data
  }

  static set (name, data, timeout = 600) {
    const itemCache = new ItemCache(data, timeout)
    ExpriesCache.cacheMap.set(name, itemCache)
  }
}

// 生成key值
function generateKey (name, argument) {
  if (!argument) return name
  const params = Array.from(argument).join(',')
  return `${name}:${params}`
}

export {
  generateKey,
  ExpriesCache
}


// ===============调用示例

// import { generateKey, ExpriesCache } from '@/util/apiCache.js'

// export function getConfig () {
//   const key = generateKey('getConfig')
//   let promise = ExpriesCache.get(key)
//   if (!promise) {
//     promise = fetch('请求地址').then(res => {
//       return Promise.resolve(res)
//     }).catch(e => {
//       ExpriesCache.delete(key)
//       return Promise.reject(e)
//     })
//     ExpriesCache.set(key, promise, 10)
//   }
//   return promise
// }