/**
 * @msg:  1.安全模式创建的工厂类
 * @param {type: 需要调用的类， content: 调用类的传参}
 * @return: 调用类实例
 */
let Factory = function(type, content) {
  if (this instanceof Factory) {
    let s = new this[type](content)
    return s
  } else {
    // 确保调用正确
    return new Factory(type, content)
  }
}

// 工厂原型中设置一堆需要调用的真实基类
Factory.prototype = {
  Java: function(content) {},
  JavaScript: function(content) {},
  Python: function(content) {}
}

/**
 * @msg: 2.抽象工厂方法，父类中只是抽象的定义了一些结构化的类簇，没有具体的实现，需要子类继承后重写这些方法。
 * @param {type}
 * @return: 继承父类的子类
 */
let VehicleFactory = function(subType, superType) {
  if (typeof VehicleFactory[superType] === 'function') {
    // 定义一个缓存函数
    function F() {}
    // 缓存函数的原型指向一个父类的实例，继承所有的属性和方法
    F.prototype = new VehicleFactory[superType]()
    // 将子类的constructor指向自身
    subType.constructor = subType
    // 子类通过寄生式继承继承父类
    subType.prototype = new F()
  } else {
    // 不存在该抽象类则抛出错误
    throw new Error('未创建该抽象类')
  }
}

// 小汽车抽象类
VehicleFactory.Car = function() {
  this.type = 'car'
}
// 定义小汽车的结构化类簇
VehicleFactory.Car.prototype = {
  getPrice: function() {
    return new Error('抽象方法不能调用')
  },
  getSpeed: function() {
    return new Error('抽象方法不能调用')
  }
}

// 宝马汽车子类
let BMW = function(price, speed) {
  this.price = price
  this.speed = speed
}
// 抽象工厂实现对抽象类的继承
VehicleFactory(BMW, 'Car')
// 重写类簇中的类
BMW.prototype.getPrice = function() {
  return this.price
}
BMW.prototype.getSpeed = function() {
  return this.speed
}
