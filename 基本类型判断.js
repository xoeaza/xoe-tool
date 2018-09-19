// 如果想获得一个变量的正确类型，可以通过 Object.prototype.toString.call(xx)。这样就可以获得类似 [object Type] 的字符串
let a = {}, //[object Object]
  b = undefined, //[object Undefined]
  c = null, //[object Null]
  d = () => {}, //[object Function]
  e = [], //[object Array]
  f = 1, //[object Number]
  g = '', //[object String]
  h = Symbol(), //[object Symbol]
  i = false //[object Boolean]
console.log(Object.prototype.toString.call(a))
