// es5普通实现
var Book = function(id, name, price) {
  // 私有属性,即new这个类后无法直接访问的属性,即book = new Book(), book.num === undefined
  var num = 1
  // 私有方法,同理，new这个类后无法直接访问的方法,即book = new Book(), book.checkId === undefined
  function checkId() {}
  // 特权方法，new后可访问，和对象共有方法唯一区别是它可以访问到私有属性或方法
  this.getNum = function() {}
  this.setName = function() {}
  this.getPrice = function() {}
  this.setPrice = function() {}
  // 对象公有属性，new后会绑定自己this的属性
  this.id = id
  // 对象共有方法
  this.copy = function() {}
  // 构造器, 用于初始化对象
  this.setName(name)
  this.setPrice(price)
}
// 类静态共有属性（对象无法访问）
Book.isChinese = true
// 类静态公有方法（对象无法访问)
Book.resetTime = function() {}
Book.prototype = {
  // 公有属性
  isJsBook: false,
  // 公有方法
  display: function() {}
}

// 闭包实现, 这样看上去更像一个整体
var Book = (function() {
  // 私有属性
  var num = 1
  // 私有方法
  function checkBook() {}
  // 返回构造函数
  function _book(id, name, price) {
    // 特权方法
    this.getNum = function() {}
    this.setName = function() {}
    this.getPrice = function() {}
    this.setPrice = function() {}
    // 对象公有属性，new后会绑定自己this的属性
    this.id = id
    // 对象共有方法
    this.copy = function() {}
    num++
    if (num > 100) throw new Error('最多100本书')
    // 构造器, 用于初始化对象
    this.setName(name)
    this.setPrice(price)
  }
  // 构建原型
  _book.prototype = {
    // 公有属性
    isJsBook: false,
    // 公有方法
    display: function() {}
  }
  // 返回类
  return _book
})()
