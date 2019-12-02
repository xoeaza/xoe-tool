// 对象拓展
const extend = function (obj1, obj2) {
    return function (object) {
        for (var property in object.prototype) {
            this.prototype[property] = object.prototype[property]
        }
        return this
    }.apply(obj1, [obj2])
}