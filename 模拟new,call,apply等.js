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
