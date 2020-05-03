// 装饰器模式：通常用于在不改变对象的基础上，通过对其进行包装拓展，使其能满足更复杂的需求。
// 例如对input的onclick事件，在不同原先逻辑的情况下，添加新逻辑
let decorator = function (input, fn) {
  // 获取事件源
  let input = document.getElementById(input)
  // 若事件源已经绑定事件
  if (typeof input.onclick === 'function') {
    // 缓存原有回调函数
    let oldClickFn = input.onclick
    // 定义新回调函数
    input.onclick = function () {
      oldClickFn()
      // 添加新处理函数
      fn()
    }
  } else {
    input.onclick = fn
  }
}

// 调用举例
decorator('name_input', function () {
  document.getElementById('name_demo_text').style.display = 'none'
})

// =========================es6语法使用示例
// 定义打开按钮
class OpenButton {
  // 点击后展示弹框（旧逻辑）
  onClick() {
    const modal = new Modal()
    modal.style.display = 'block'
  }
}

// 定义按钮对应的装饰器
class Decorator {
  // 将按钮实例传入
  constructor(open_button) {
    this.open_button = open_button
  }

  onClick() {
    this.open_button.onClick()
    // “包装”了一层新逻辑
    this.changeButtonStatus()
  }

  changeButtonStatus() {
    this.changeButtonText()
    this.disableButton()
  }

  disableButton() {
    const btn = document.getElementById('open')
    btn.setAttribute('disabled', true)
  }

  changeButtonText() {
    const btn = document.getElementById('open')
    btn.innerText = '快去登录'
  }
}

const openButton = new OpenButton()
const decorator = new Decorator(openButton)

document.getElementById('open').addEventListener('click', function () {
  // openButton.onClick()
  // 此处可以分别尝试两个实例的onClick方法，验证装饰器是否生效
  decorator.onClick()
})

// =======================es7使用举例
// 装饰器函数，它的第一个参数是目标类
function classDecorator(target) {
  target.hasDecorator = true
  return target
}

// 将装饰器“安装”到Button类上
@classDecorator
class Button {
  // Button类的相关逻辑
}

// 验证装饰器是否生效
console.log('Button 是否被装饰了：', Button.hasDecorator)

// 用同样的语法糖去装饰类里面的方法
function funcDecorator(target, name, descriptor) {
  let originalMethod = descriptor.value
  descriptor.value = function () {
    console.log('我是Func的装饰器逻辑')
    return originalMethod.apply(this, arguments)
  }
  return descriptor
}

class Button {
  @funcDecorator
  onClick() {
    console.log('我是Func的原有逻辑')
  }
}

// 验证装饰器是否生效
const button = new Button()
button.onClick()
