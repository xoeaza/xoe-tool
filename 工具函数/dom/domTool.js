// 1.检查元素是否具有指定的类名
const hasClass = (el, className) => el.classList.contains(className)
hasClass(document.querySelector('p.special'), 'special') // true

// 2.切换一个元素的类
const toggleClass = (el, className) => el.classList.toggle(className)
toggleClass(document.querySelector('p.special'), 'special')

// 3.获取当前页面的滚动位置
const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop,
})
getScrollPosition() // {x: 0, y: 200}

// 4.检查父元素是否包含子元素
const elementContains = (parent, child) => parent !== child && parent.contains(child)
elementContains(document.querySelector('head'), document.querySelector('title'))
// true

// 5.检查指定的元素在视口中是否可见
const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
  const { top, left, bottom, right } = el.getBoundingClientRect()
  const { innerHeight, innerWidth } = window
  return partiallyVisible
    ? ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) && ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
    : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth
}
elementIsVisibleInViewport(el) // 需要左右可见
elementIsVisibleInViewport(el, true) // 需要全屏(上下左右)可以见

// 6.获取元素中的所有图像
const getImages = (el, includeDuplicates = false) => {
  const images = [...el.getElementsByTagName('img')].map(img => img.getAttribute('src'))
  return includeDuplicates ? images : [...new Set(images)]
}
// 事例：includeDuplicates 为 true 表示需要排除重复元素
getImages(document, true) // ['image1.jpg', 'image2.png', 'image1.png', '...']
getImages(document, false) // ['image1.jpg', 'image2.png', '...']

// 7.确定设备是移动设备还是台式机/笔记本电脑
const detectDeviceType = () => (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop')
detectDeviceType() // "Mobile" or "Desktop"

// 8.判断是否支持ellipsis
function isSupportLineClamp() {
  let isSupport = true
  const node = document.createElement('div')
  if ('WebkitLineClamp' in node.style) {
    node.style.WebkitLineClamp = '3'
    if (node.style.WebkitLineClamp !== '3') {
      isSupport = false
    }
  }
  return isSupport
}
