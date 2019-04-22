/* 执行new 操作时发生的四个过程
1.新生成了一个对象
2.链接到原型
3.绑定 this
4.返回新对象
在调用 new 的过程中会发生以上四件事情，我们也可以试着来自己实现一个 new
 */

function create() {
  // 创建一个空的对象
  let obj = new Object()
  // 获得构造函数
  let Con = [].shift.call(arguments)
  // 链接到原型
  obj.__proto__ = Con.prototype
  // 绑定 this，执行构造函数
  let result = Con.apply(obj, arguments)
  // 确保 new 出来的是个对象
  return typeof result === 'object' ? result : obj
}

// 模拟实现一个call函数
Function.prototype.call2 = function(context, ...args) {
  context = context || window
  context.__fn__ = this
  let result = context.__fn__(...args)
  delete context.__fn__
  return result
}

// 模拟实现一个apply函数
Function.prototype.apply2 = function(context, ...args) {
  context = context || window
  context._fn_ = this
  let result = context._fn_(args)
  delete context._fn_
  return result
}

// 模拟实现一个bind函数
Function.prototype.bind2 = function(context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  var _this = this
  var args = [...arguments].slice(1)
  // 返回一个函数
  return function F() {
    // 因为返回了一个函数，我们可以 new F()，所以需要判断
    if (this instanceof F) {
      return new _this(...args, ...arguments)
    }
    return _this.apply(context, args.concat(...arguments))
  }
}

// 模拟实现一个instanceof函数
function _instanceof(obj, constructor) {
  let proto = obj.__proto__
  const prototype = constructor.prototype
  while (true) {
    if (proto === null) return false
    if (proto === prototype) return true
    proto = proto.__proto__
  }
}
