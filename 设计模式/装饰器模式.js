// 装饰器模式：通常用于在不改变对象的基础上，通过对其进行包装拓展，使其能满足更复杂的需求。
// 例如对input的onclick事件，在不同原先逻辑的情况下，添加新逻辑
let decorator = function(input, fn) {
  // 获取事件源
  let input = document.getElementById(input)
  // 若事件源已经绑定事件
  if (typeof input.onclick === 'function') {
    // 缓存原有回调函数
    let oldClickFn = input.onclick
    // 定义新回调函数
    input.onclick = function() {
      oldClickFn()
      // 添加新处理函数
      fn()
    }
  } else {
    input.onclick = fn
  }
}

// 调用举例
decorator('name_input', function() {
  document.getElementById('name_demo_text').style.display = 'none'
})
