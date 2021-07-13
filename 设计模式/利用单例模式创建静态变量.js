// 单例模式：指只允许实例化一次的对象类
// 通常用它来1.定义命名空间（命名空间即nameSpace，因为每个人定义的变量名可能重复，为解决这一问题，可以用命名空间来约束每一个人定义的变量）；2.管理代码库的各个模块；3.管理静态变量
let LazySingle = (function () {
  // 用于单例实例引用
  let _instance = null
  function single() {
    // 静态变量（只能访问不能修改，创建后即可使用）
    let conf = {
      MAX_NUM: 100,
      MIN_NUM: 1,
      COUNT: 100
    }
    // 返回取值器对象
    return {
      // 取值器方法
      get: function (name) {
        return conf[name] ? conf[name] : null
      }
    }
  }
  // 获取单例对象接口
  return function () {
    if (!_instance) {
      _instance = new single()
    }
    // 返回单例
    return _instance
  }
})()

// 即可获取静态变量MAX_NUM
console.log(LazySingle().get('MAX_NUM'))

// ========================保证一个类就一个实例，并提供一个访问它的全局站点
class SingleDemo {
  static getInstance() {
    if (!SingleDemo._instance) {
      SingleDemo._instance = new SingleDemo()
    }

    return SingleDemo._instance
  }

  fn() {
    console.log('我是一个单例对象')
  }
}

let a = SingleDemo.getInstance()
let b = SingleDemo.getInstance()

console.log(a === b) //true

// ===============面试题实现Storage，使得该对象为单例，基于 localStorage 进行封装。实现方法 setItem(key,value) 和 getItem(key)。
class Storage {
  static getInstance() {
    if (!Storage._instance) {
      Storage._instance = new Storage()
    }

    return Storage._instance
  }

  setItem(key, val) {
    return localStorage.setItem(key, val)
  }

  getItem(key) {
    return localStorage.getItem(key)
  }
}

// 闭包版
// 先实现一个基础的StorageBase类，把getItem和setItem方法放在它的原型链上
function StorageBase() {}
StorageBase.prototype.getItem = function (key) {
  return localStorage.getItem(key)
}
StorageBase.prototype.setItem = function (key, value) {
  return localStorage.setItem(key, value)
}

// 以闭包的形式创建一个引用自由变量的构造函数
const Storage = (function () {
  let instance = null
  return function () {
    // 判断自由变量是否为null
    if (!instance) {
      // 如果为null则new出唯一实例
      instance = new StorageBase()
    }
    return instance
  }
})()

// ==================面试题实现一个全局唯一的Modal弹框
// 核心逻辑，这里采用了闭包思路来实现单例模式
const Modal = (function () {
  let modal = null
  return function () {
    if (!modal) {
      modal = document.createElement('div')
      modal.innerHTML = '我是一个全局唯一的Modal'
      modal.id = 'modal'
      modal.style.display = 'none'
      document.body.appendChild(modal)
    }
    return modal
  }
})()

// 点击打开按钮展示模态框
document.getElementById('open').addEventListener('click', function () {
  // 未点击则不创建modal实例，避免不必要的内存占用;此处不用 new Modal 的形式调用也可以，和 Storage 同理
  const modal = new Modal()
  modal.style.display = 'block'
})

// 点击关闭按钮隐藏模态框
document.getElementById('close').addEventListener('click', function () {
  const modal = new Modal()
  if (modal) {
    modal.style.display = 'none'
  }
})
