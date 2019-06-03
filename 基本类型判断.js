// 在 JS 最初版本中，使用的是 32 位系统，为了性能考虑使用低位存储了变量的类型信息，000 开头代表是对象.然而 null 表示为全零，所以被错误的判断为object。虽然现在的内部类型判断代码已经改变，但是这Bug却一直流传下来。
typeof null // 'object'
// 如果想获得一个变量的正确类型，可以通过 Object.prototype.toString.call(xx)。这样就可以获得类似 [object Type] 的字符串
let a = {}, //[object Object]
  b = undefined, //[object Undefined]
  c = null, //[object Null]
  d = () => { }, //[object Function]
  e = [], //[object Array]
  f = 1, //[object Number]
  g = '', //[object String]
  h = Symbol(), //[object Symbol]
  i = false //[object Boolean]
console.log(Object.prototype.toString.call(a))


// 封装成函数调用
const isType = type => target => `[object ${type}]` === Object.prototype.toString.call(target)
const isArray = isType('Array')
console.log(isArray([])); // true
