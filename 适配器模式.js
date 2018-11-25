// 适配器模式即将一个类（对象）的接口（方法或属性）转化成另一个接口，从而抹平类（对象）之间的接口差异问题
// 好多抹平差异性的方法都可以认为是适配器

/**
 * @msg: 定义一个封装了为元素绑定事件的简易框架
 * @param {type}
 * @return:
 */
let A = A || {}
// 通过id获取元素
A.g = function(id) {
  return document.getElementById(id)
}
// 为元素绑定事件
A.on = function(id, type, fn) {
  // 如果传入id是字符串则以id处理，否则以元素对象处理
  let dom = typeof id === 'string' ? A.g(id) : id
  // 标准DOM2级添加事件方式
  if (dom.addEventListener) {
    dom.addEventListener(type, fn, false)
  } else if (dom.attachEvent) {
    dom.attachEvent('on' + type, fn)
  } else {
    // 简易添加事件方式,容易被覆盖
    dom['on' + type] = fn
  }
}

/**
 * @msg: 参数适配器，如果一个函数需要传递很多参数，那么记住这些参数顺序是很麻烦的，这时通常用一个参数对象的形式传入
 * 为处理参数传入不完整，有些参数得有默认值等情况，通常用适配器来对参数对象进行适配
 * @param {type}
 * @return:
 */
function doSomething(obj) {
  let _adapter = {
    name: 'book',
    title: 'art',
    age: '1',
    color: 'white',
    page: '100',
    prize: '20'
  }

  for (let i in _adapter) {
    _adapter[i] = obj[i] || _adapter[i]
  }
  // 其他处理逻辑
}
