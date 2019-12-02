// question: 写一个函数，生成一个长度为100的数组，数组里面是打乱的0-99的数，且互不重复

// 生成0-100的有序数组[0,1,2,3...99]
const productArray = num => {
  return [...Array(num)].map((item, index) => index)
}
// 拓展性较小的写法
// const  productArray = (num) => [...Array(num).keys()]

// 打乱函数
const shuffle = arr => {
  let end = arr.length - 1
  while (end) {
    const index = Math.floor(Math.random() * (end + 1))
    ;[arr[index], arr[end]] = [arr[end], arr[index]]
    --end
  }
  return arr
}

console.log(shuffle(productArray(100)))
