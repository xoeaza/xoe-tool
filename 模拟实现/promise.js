const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

class myPromise {
    constructor(value) {
        this.status = PENDING
        this.value = value
        this.resolveCallBacks = []
        this.rejectCallBacks = []
    }

    resolve(value) {
        if (value instanceof myPromise) {
            return value.then(resolve, reject)
        }
        const that = this
        if (this.status === PENDING) {
            this.status = RESOLVED
            this.value = value
            this.resolveCallBacks.forEach(callBack => {
                callBack(that.value)
            })
        }
    }

    reject() {
        const that = this
        if (this.status === PENDING) {
            this.status = REJECTED
            this.value = value
            this.rejectCallBacks.forEach(callBack => {
                callBack(that.value)
            })
        }
    }

    then(onFulFilled, onRejected) {
        // const that = this
        onFulFilled = typeof onFulFilled === 'function' ? onFulFilled : v => v
        onRejected =
            typeof onFulFilled === 'function'
                ? onRejected
                : r => {
                      throw r
                  }
        if (this.status === PENDING) {
            this.resolveCallBacks.push(onFulFilled)
            this.rejectCallBacks.push(onRejected)
        } else if (this.status === RESOLVED) {
            onFulFilled(this.value)
        } else {
            onRejected(this.value)
        }
    }
}

// 实现Promise.all
Promise.all = function(promises) {
    // promise 是可迭代对象，省略参数合法性检查
    return new Promise((resolve, reject) => {
        // Array.from将可迭代对象转换成数组
        promises = Array.from(promises)
        if (promises.length === 0) {
            resolve([])
        } else {
            let result = []
            let index = 0
            for (let i = 0, l = promises.length; i < l; i++) {
                // 考虑到 i 可能是 thenable 对象也可能是普通值
                Promise.resolve(promises[i]).then(
                    data => {
                        result[i] = data
                        if (++index === promises.length) {
                            // 所有的 promises 状态都是 fulfilled, promise.all 返回的实例才变成 fullfilled 态
                            resolve(result)
                        }
                    },
                    err => {
                        reject(err)
                        return
                    }
                )
            }
        }
    })
}
