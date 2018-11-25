// 单例模式：指只允许实例化一次的对象类
// 通常用它来1.定义命名空间（命名空间即nameSpace，因为每个人定义的变量名可能重复，为解决这一问题，可以用命名空间来约束每一个人定义的变量）；2.管理代码库的各个模块；3.管理静态变量
let LazySingle = (function() {
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
      get: function(name) {
        return conf[name] ? conf[name] : null
      }
    }
  }
  // 获取单例对象接口
  return function() {
    if (!_instance) {
      _instance = new single()
    }
    // 返回单例
    return _instance
  }
})()

// 即可获取静态变量MAX_NUM
console.log(LazySingle().get('MAX_NUM'))
