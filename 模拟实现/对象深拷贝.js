// 对象的深拷贝简易版, 不考虑原型链如何处理，dom如何处理等情况，就是普通对象的深拷贝
// 需要处理完各种边界情况的，建议直接使用lodash 的深拷贝函数https://lodash.com/docs/4.17.11#cloneDeep
const deepClone = obj => {
  let clone = Object.assign({}, obj)
  Object.keys(obj).forEach(key => {
    clone[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key]
  })
  return Array.isArray(obj)
    ? (clone.length = obj.length) && Array.from(clone)
    : clone
}

// 写法二
const deepClone2 = obj => {
  // 增加个参数判断
  function isObject(o) {
    return (typeof o === 'object' || typeof o === 'function') && o !== null
  }
  if (!isObject(obj)) {
    throw new Error('非对象')
  }

  let clone = Array.isArray(obj) ? [...obj] : { ...obj }
  Reflect.ownKeys(clone).forEach(key => {
    clone[key] = isObject(obj[key]) ? deepClone2(obj[key]) : obj[key]
  })
  return clone
}
