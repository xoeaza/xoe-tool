try {
    await loadJs('https://xxxxxx.js')
    console.log(' 加载成功 ')
} catch {
    console.log(' 加载失败 ')
}

function loadJs(path) {
    if (document.head.querySelector(`script[src="${path}"]`) != null) return

    var script = document.createElement('script')
    script.src = path
    script.type = 'text/javascript'
    document.head.appendChild(script)

    return new Promise((res, rej) => {
        script.addEventListener('load', res)
        script.addEventListener('error', rej)
    })
}

// 动态引入css
try {
    await loadCss('https://xxxxxx.css')
    console.log(' 加载成功 ')
} catch {
    console.log(' 加载失败 ')
}

function loadCss(path) {
    if (document.head.querySelector(`link[href="${path}"]`) != null) return

    var link = document.createElement('link')
    link.href = path
    link.rel = 'stylesheet'
    link.type = 'text/css'
    document.head.appendChild(link)

    return new Promise((res, rej) => {
        link.addEventListener('load', res)
        link.addEventListener('error', rej)
    })
}
