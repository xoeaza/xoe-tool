// 简易版防抖，在间隔时间内不断触发，只调用最后一次
const debounce = (fn, ms = 50) => {
    let timer = 0
    return function (...args) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => fn.apply(this, args), ms)
    }
}

// 带立即执行的防抖，可以立即执行，过间隔时间后可再调用执行
function debounce(func, wait = 50, immediate = true) {
    let timer, context, args
    const later = () =>
        setTimeout(() => {
            timer = null
            if (!immediate) {
                func.apply(context, args)
                context = args = null
            }
        }, wait)

    return function (...params) {
        if (!timer) {
            timer = later()
            if (immediate) {
                func.apply(this, params)
            } else {
                context = this
                args = params
            }
        } else {
            clearTimeout(timer)
            timer = later()
        }
    }
}

// 立即执行debounce另一写法
function debounce(func, wait, immediate) {
    let timeout;
    return function () {
        const context = this,
            args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate) {
                func.apply(context, args);
            }
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) {
            func.apply(context, args);
        }
    };
}

// 节流函数，将多次执行变成每隔一段时间执行
const throttle = (fn, wait) => {
    let inThrottle, lastFn, lastTime
    return function (...args) {
        const context = this,
        if (!inThrottle) {
            fn.apply(context, args)
            lastTime = Date.now()
            inThrottle = true
        } else {
            clearTimeout(lastFn)
            lastFn = setTimeout(function () {
                if (Date.now() - lastTime >= wait) {
                    fn.apply(context, args)
                    lastTime = Date.now()
                }
            }, wait - (Date.now() - lastTime))
        }
    }
}
