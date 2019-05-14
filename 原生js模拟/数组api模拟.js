// forEach
Array.prototype.myForEach = function (fn, context = null) {
  if (typeof fn !== 'function') throw new TypeError(fn + 'is not a function')
  let index = 0
  let arr = this
  let len = arr.length
  while (index < len) {
    if (index in arr) {
      fn.call(context, arr[index], index, arr)
    }
    index++
  }
}

// map
Array.prototype.myMap = function (fn, context = null) {
  if (typeof fn !== 'function') throw new TypeError(fn + 'is not a function')
  let newArray = []
  let index = 0
  let arr = this
  let len = arr.length
  while (index < len) {
    if (index in arr) {
      newArray[index] = fn.call(context, arr[index], index, arr)
    }
    index++
  }
}

// 使用reduce实现map
Array.prototype.myMap2 = function (fn, context = null) {
  if (typeof fn !== 'function') throw new TypeError(fn + 'is not a function')
  let arr = this
  return arr.reduce((pre, item, index, arr) => {
    let now = fn.call(context, item, index, arr)
    return [...pre, now]
  }, [])
}

// filter 
Array.prototype.myFilter = function (fn, context = null) {
  if (typeof fn !== 'function') throw new TypeError(fn + 'is not a function')
  let arr = this
  let len = arr.length
  let index = 0
  let k = 0
  let newArray = []
  while (index < len) {
    if (index in arr) {
      let result = fn.call(context, arr[index], index, arr)
      if (result) newArray[k++] = arr[index]
    }
    index++
  }
  return newArray
}
