const dateFormatter = (formatter, date) => {
    date = date ? new Date(date) : new Date()
    const Y = date.getFullYear() + '',
        M = date.getMonth() + 1,
        D = date.getDate(),
        H = date.getHours(),
        m = date.getMinutes(),
        s = date.getSeconds()
    return formatter
        .replace(/YYYY|yyyy/g, Y)
        .replace(/YY|yy/g, Y.substr(2, 2))
        .replace(/MM/g, (M < 10 ? '0' : '') + M)
        .replace(/DD/g, (D < 10 ? '0' : '') + D)
        .replace(/HH|hh/g, (H < 10 ? '0' : '') + H)
        .replace(/mm/g, (m < 10 ? '0' : '') + m)
        .replace(/ss/g, (s < 10 ? '0' : '') + s)
}

dateFormatter('YYYY-MM-DD HH:mm', '1995/02/15 13:55') // 1995-02-15 13:55

Date.prototype.format = function(format) {
    var args = {
        'M+': this.getMonth() + 1,
        'D+': this.getDate(),
        'H+': this.getHours(),
        'm+': this.getMinutes(),
        's+': this.getSeconds(),
        'q+': Math.floor((this.getMonth() + 3) / 3), //quarter
        S: this.getMilliseconds(),
    }
    if (/(Y+)/.test(format))
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (var i in args) {
        var n = args[i]
        if (new RegExp('(' + i + ')').test(format))
            format = format.replace(
                RegExp.$1,
                RegExp.$1.length == 1 ? n : ('00' + n).substr(('' + n).length)
            )
    }
    return format
}

// 使用方式
// 日期和时间
new Date().format('YYYY-MM-DD HH:mm') // 2019-03-10 12:03
new Date().format('YYYY-M-D H:m') // 2019-3-10 12:3
// 日期
new Date().format('YYYY-MM-DD') // 2019-03-10
new Date().format('YYYY-M-D') // 2019-3-10
