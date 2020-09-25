`<ul>
  <li><img src="./imgs/default.png" data="./imgs/1.png" alt=""></li>
  <li><img src="./imgs/default.png" data="./imgs/2.png" alt=""></li>
  <li><img src="./imgs/default.png" data="./imgs/3.png" alt=""></li>
  <li><img src="./imgs/default.png" data="./imgs/4.png" alt=""></li>
  <li><img src="./imgs/default.png" data="./imgs/5.png" alt=""></li>
  <li><img src="./imgs/default.png" data="./imgs/6.png" alt=""></li>
  <li><img src="./imgs/default.png" data="./imgs/7.png" alt=""></li>
  <li><img src="./imgs/default.png" data="./imgs/8.png" alt=""></li>
  <li><img src="./imgs/default.png" data="./imgs/9.png" alt=""></li>
  <li><img src="./imgs/default.png" data="./imgs/10.png" alt=""></li>
</ul>`

let imgs =  document.querySelectorAll('img')
// 可视区高度
let clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
function lazyLoad () {
  // 滚动卷去的高度
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
  for (let i = 0; i < imgs.length; i ++) {
    // 图片在可视区冒出的高度
    let x = clientHeight + scrollTop - imgs[i].offsetTop
    // 图片在可视区内
    if (x > 0 && x < clientHeight+imgs[i].height) {
      imgs[i].src = imgs[i].getAttribute('data')
    } 
  }      
}
// addEventListener('scroll', lazyLoad) or setInterval(lazyLoad, 1000)


// =================================================================
// getBoundingClientRect 实现懒加载
let imgList1 = [...document.querySelectorAll(".get_bounding_rect")]
let num = imgList1.length

let lazyLoad1 = (function () {
    let count = 0
    return function () {
        let deleteIndexList = []
        imgList1.forEach((img,index) => {
            let rect = img.getBoundingClientRect()
            if (rect.top < window.innerHeight) {
                img.src = img.dataset.src
                // 加载成功后将图片添加到删除列表中
                deleteIndexList.push(index)
                count++
                if (count === num) {
                    //当图片全部加载完毕解绑scroll事件
                    document.removeEventListener('scroll',lazyLoad1)
                }
            }
        })
        // 删除已经加载完毕的图片
        imgList1 = imgList1.filter((_,index)=>!deleteIndexList.includes(index))

    }
})()

// 这里引用了 throttle.js 的节流函数
lazyLoad1 = proxy(lazyLoad1, 100)

document.addEventListener('scroll', lazyLoad1)
// 手动加载一次，否则首屏的图片不触发滚动无法加载
lazyLoad1()



// intersectionObserver 实现懒加载
let imgList2 = [...document.querySelectorAll(".intersection_observer")]

let lazyLoad2 = function () {
    // 实例化observer
    let observer = new IntersectionObserver(entries => {
        //entries存储着所有观察被元素的intersectionObserverEntry配置
        entries.forEach(entry => {
            // 大于0表示进入视口
            if (entry.intersectionRatio > 0) {
                entry.target.src = entry.target.dataset.src
                //取消观察
                observer.unobserve(entry.target)
            }
        })
    })
    imgList2.forEach(img => {
        observer.observe(img)
    })
}

lazyLoad2()