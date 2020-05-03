// 事件代理的实现
// 用代理模式实现多个子元素的事件监听，代码会简单很多：
// 获取父元素
const father = document.getElementById('father')

// 给父元素安装一次监听函数
father.addEventListener('click', function(e) {
    // 识别是否是目标子元素
    if(e.target.tagName === 'A') {
        // 以下是监听函数的函数体
        e.preventDefault()
        alert(`我是${e.target.innerText}`)
    }
} )



// 虚拟代理
class PreLoadImage {
  constructor(imgNode) {
      // 获取真实的DOM节点
      this.imgNode = imgNode
  }
   
  // 操作img节点的src属性
  setSrc(imgUrl) {
      this.imgNode.src = imgUrl
  }
}

class ProxyImage {
  // 占位图的url地址
  static LOADING_URL = 'xxxxxx'

  constructor(targetImage) {
      // 目标Image，即PreLoadImage实例
      this.targetImage = targetImage
  }
  
  // 该方法主要操作虚拟Image，完成加载
  setSrc(targetUrl) {
     // 真实img节点初始化时展示的是一个占位图
      this.targetImage.setSrc(ProxyImage.LOADING_URL)
      // 创建一个帮我们加载图片的虚拟Image实例
      const virtualImage = new Image()
      // 监听目标图片加载的情况，完成时再将DOM上的真实img节点的src属性设置为目标图片的url
      virtualImage.onload = () => {
          this.targetImage.setSrc(targetUrl)
      }
      // 设置src属性，虚拟Image实例开始加载图片
      virtualImage.src = targetUrl
  }
}