const inViewport = (el, partiallyVisible = false) => {
    const { top, left, bottom, right } = el.getBoundingClientRect();
    const { innerHeight, innerWidth } = window;
    return partiallyVisible
        ? ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) &&
        ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
        : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
};

// 使用场景：利用 可视区域 来实现图片的懒加载
// 容器
<div class="container">
    <div class="img-box img-placeholder" data-src="http://suo.im/5p9IOS"></div>
    <div class="img-box img-placeholder" data-src="http://suo.im/5p9IOS"></div>
    <div class="img-box img-placeholder" data-src="http://suo.im/5p9IOS"></div>
    <div class="img-box img-placeholder" data-src="http://suo.im/5p9IOS"></div>
    <div class="img-box img-placeholder" data-src="http://suo.im/5p9IOS"></div>
    <div class="img-box img-placeholder" data-src="http://suo.im/5p9IOS"></div>
    <div class="img-box img-placeholder" data-src="http://suo.im/5p9IOS"></div>
    <div class="img-box img-placeholder" data-src="http://suo.im/5p9IOS"></div>
    <div class="img-box img-placeholder" data-src="http://suo.im/5p9IOS"></div>
    <div class="img-box img-placeholder" data-src="http://suo.im/5p9IOS"></div>
    <div class="img-box img-placeholder" data-src="http://suo.im/5p9IOS"></div>
    <div class="img-box img-placeholder" data-src="http://suo.im/5p9IOS"></div>
    <div class="img-box img-placeholder" data-src="http://suo.im/5p9IOS"></div>
</div>

// 样式
.img-box {
    width: 200px;
    height: 200px;
    margin: 10px 0 10px 10px;
    background: #eee;
    display: inline-block;
}

.img-box > img {
    width: 100%;
    height: 100%;
}

// 懒加载脚本
document.addEventListener('scroll', lazyLoading)
window.onload = () => lazyLoading()

function lazyLoading() {
    const boxs = document.querySelectorAll('.img-placeholder')

    Array.from(boxs).map(box => {
        if (!inViewport(box, true)) return;

        // 获取图片地址并清除数据记录 
        const src = box.getAttribute('data-src');
        box.removeAttribute('data-src');

        // 插入图片 DOM
        box.innerHTML = `<img src='${src}'>`;

        // 去除占位 class
        box.className = box.className.replace('img-placeholder', '')
    })
}