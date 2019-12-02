// 数组去重，当然用new Set()是最便捷的,这里提供另一种思路，用hash的实现方式
let unique = arr => {
  let uniArr = []
  let hash = {}
  for (let i = 0, l = arr.length; i < l; i++) {
    if (!hash[arr[i]]) {
      hash[arr[i]] = true
      uniArr.push(arr[i])
    }
  }
  return uniArr
}

// hash实现找出字符串中出现次数最多的字母
let findMaxCharInString = str => {
  if (str.length === 1) return str
  let hash = {}
  for (let i = 0, l = str.length; i < l; i++) {
    if (hash[str.charAt(i)]) {
      hash[str.charAt(i)] += 1
    } else {
      hash[str.charAt(i)] = 1
    }
  }
  let maxChar = ''
  let maxNum = 0
  Object.keys(hash).forEach(key => {
    if (hash[key] > maxNum) {
      maxNum = hash[key]
      maxChar = key
    }
  })
  return maxChar
}

console.log(findMaxCharInString('abcdd'))
