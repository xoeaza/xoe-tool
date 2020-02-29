// forEach
Array.prototype.myForEach = function(fn, context = null) {
    if (typeof fn !== 'function') throw new TypeError(fn + 'is not a function')
    let index = 0
    let arr = this
    let len = arr.length
    while (index < len) {
        if (index in arr) {
            fn.call(context, arr[index], index, arr)
        }
        index++
    }
}

// map
Array.prototype.myMap = function(fn, context = null) {
    if (typeof fn !== 'function') throw new TypeError(fn + 'is not a function')
    let newArray = []
    let index = 0
    let arr = this
    let len = arr.length
    while (index < len) {
        if (index in arr) {
            newArray[index] = fn.call(context, arr[index], index, arr)
        }
        index++
    }
}

// 使用reduce实现map
Array.prototype.myMap2 = function(fn, context = null) {
    if (typeof fn !== 'function') throw new TypeError(fn + 'is not a function')
    let arr = this
    return arr.reduce((pre, item, index, arr) => {
        let now = fn.call(context, item, index, arr)
        return [...pre, now]
    }, [])
}

// filter
Array.prototype.myFilter = function(fn, context = null) {
    if (typeof fn !== 'function') throw new TypeError(fn + 'is not a function')
    let arr = this
    let len = arr.length
    let index = 0
    let k = 0
    let newArray = []
    while (index < len) {
        if (index in arr) {
            let result = fn.call(context, arr[index], index, arr)
            if (result) newArray[k++] = arr[index]
        }
        index++
    }
    return newArray
}

// reduce
Array.prototype.myreduce = function reduce(callbackfn) {
    // 拿到数组
    const O = this,
        len = O.length
    // 下标值
    let k = 0,
        // 累加器
        accumulator = undefined,
        // k下标对应的值是否存在
        kPresent = false,
        // 初始值
        initialValue = arguments.length > 1 ? arguments[1] : undefined

    if (typeof callbackfn !== 'function') {
        throw new TypeError(callbackfn + ' is not a function')
    }

    // 数组为空，并且有初始值，报错
    if (len === 0 && arguments.length < 2) {
        throw new TypeError('Reduce of empty array with no initial value')
    }

    // 如果初始值存在
    if (arguments.length > 1) {
        // 设置累加器为初始值
        accumulator = initialValue
        // 初始值不存在
    } else {
        accumulator = O[k]
        ++k
    }

    while (k < len) {
        // 判断是否为 empty [,,,]
        kPresent = O.hasOwnProperty(k)

        if (kPresent) {
            const kValue = O[k]
            // 调用 callbackfn
            accumulator = callbackfn.apply(undefined, [accumulator, kValue, k, O])
        }
        ++k
    }

    return accumulator
}
