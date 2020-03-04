// 1. 如何让 (a == 1 && a == 2 && a == 3) 的值为true？
// 利用数据劫持(Proxy/Object.definedProperty)
let a = new Proxy(
    {},
    {
        i: 1,
        get: function() {
            return () => this.i++
        },
    }
)
