// 1.类式继承，最原始的继承方式，缺点是一个子类的实例对父类构造函数继承来的公有属性的改变，会影响到其他子类
function superBook() {
  this.books = ['a', 'b', 'c']
  this.id = 0
}

function subBook() {
  this.bookNum = 1
}

subBook.prototype = new superBook()

let book1 = new subBook()
let book2 = new subBook()

book1 instanceof subBook //true
book1 instanceof superBook // true
subBook instanceof superBook // false 因为subBook不是superBook的实例
subBook.prototype instanceof superBook // true

console.log(book2.books) //['a', 'b', 'c']
book1.books.push('d')
console.log(book2.books) //['a', 'b', 'c', 'd'] book2的books属性被影响

// 2.构造函数继承，可以避免继承的公有属性被其他子类影响，缺点是无法继承父类用prototype定义的公共方法/属性，如果把这些方法移到构造函数内，那每个实例又都会复制一份，违背了公有方法代码公用的原则。
function superBook2(id) {
  this.books = ['a', 'b', 'c']
  this.id = id
}
superBook2.prototype.showBooks = function () {
  return this.books
}

function subBook2(id) {
  this.bookNum = 1
  return superBook2.call(this, id)
}

let book3 = new subBook2(10)
let book4 = new subBook2(11)
book3.books.push('d')
console.log(book3.id, book3.books) // 10 [ 'a', 'b', 'c', 'd' ]​​​​​
console.log(book4.id, book4.books) //11 [ 'a', 'b', 'c' ]​​​​​
// book3.showBooks() //​​book3.showBooks is not a function​​ 无法继承父类用prototype定义的公共方法/属性

// 3.组合继承，类式和构造函数式的大杂烩，就是构造函数式再加个prototye。缺点，父类构造函数执行了  两遍。
function superBook3(id) {
  this.books = ['a', 'b', 'c']
  this.id = id
}
superBook3.prototype.showBooks = function () {
  return this.books
}

function subBook3(id) {
  this.bookNum = 1
  return superBook3.call(this, id)
}
subBook3.prototype = new superBook3()

let book5 = new subBook3(10)
let book6 = new subBook3(11)
book5.books.push('d')
console.log(book5.id, book5.books) // 10 [ 'a', 'b', 'c', 'd' ]​​​​​
console.log(book6.id, book6.books) //11 [ 'a', 'b', 'c' ]​​​​​
console.log(book5.showBooks()) //​​​​​[ 'a', 'b', 'c', 'd' ]​​​​​

// 4.原型式继承，相当于对类型继承的封装，是寄生式继承的基础，不单独使用
function inheritObject(o) {
  // 声明一个过渡函数
  function F() { }
  // 过渡函数的原型继承父对象
  F.prototype = o
  return new F()
}

// 5.寄生式继承，是对原型式继承的封装，所谓寄生，即依赖原型式继承，通常通过它拓展对象，添加新的属性和方法
let list = {
  name: 'book',
  use: ['read', 'learn']
}

function createBook(obj) {
  // 通过原型继承方式创建新对象
  let o = new inheritObject(obj)
  // 拓展方法
  o.getListName = function () {
    return this.name
  }
  return o
}

// 6.寄生组合式继承，解决寄生式继承子类不是父类实例的问题
// 前提知识，每升成一个函数或者对象时，都会为其创建一个protoType对象（xx.protoType），这个protoType对象中会像函数中创建this一样创建一个constructor属性，而这个constructor属性指向的就是包含protoType对象的完整的函数或对象。
// 修正constructor函数
function inheritProtoType(subClass, superClass) {
  // 创建一个_proto_指向父类protoType的对象
  let o = inheritObject(superClass.prototype)
  // 把constructor指向子类
  o.contructor = subClass
  // 设置子类的原型
  subClass.prototype = o
}

function superBook5(id) {
  this.books = ['a', 'b', 'c']
  this.id = id
}
superBook5.prototype.showBooks = function () {
  return this.books
}

function subBook5(id) {
  this.bookNum = 1
  return superBook5.call(this, id)
}
// 寄生式继承父类原型
inheritProtoType(subBook5, superBook5)


// 添加基于Object新方法的继承函数
function inherit(subType, superType) {
  subType.prototype = Object.create(superType.prototype, {
    constructor: {
      enumerable: false,
      configurable: true,
      writable: true,
      // 指向子类，和默认的继承行为保持一致
      value: subType.constructor
    }
  })
  // 继承父类的静态方法和静态属性
  Object.setPrototypeOf(subType, superType)
}


