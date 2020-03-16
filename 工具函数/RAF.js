class RAF {
    constructor() {
        this.init()
    }
    init() {
        this._timerIdMap = {
            timeout: {},
            interval: {},
        }
    }
    run(type = 'interval', cb, interval = 16.7) {
        const now = Date.now
        let stime = now()
        let etime = stime
        //创建Symbol类型作为key值，保证返回值的唯一性，用于清除定时器使用
        const timerSymbol = Symbol()
        const loop = () => {
            this.setIdMap(timerSymbol, type, loop)
            etime = now()
            if (etime - stime >= interval) {
                if (type === 'interval') {
                    stime = now()
                    etime = stime
                }
                cb()
                type === 'timeout' && this.clearTimeout(timerSymbol)
            }
        }
        this.setIdMap(timerSymbol, type, loop)
        return timerSymbol // 返回Symbol保证每次调用setTimeout/setInterval返回值的唯一性
    }
    setIdMap(timerSymbol, type, loop) {
        const id = requestAnimationFrame(loop)
        this._timerIdMap[type][timerSymbol] = id
    }
    setTimeout(cb, interval) {
        // 实现setTimeout 功能
        return this.run('timeout', cb, interval)
    }
    clearTimeout(timer) {
        cancelAnimationFrame(this._timerIdMap.timeout[timer])
    }
    setInterval(cb, interval) {
        // 实现setInterval功能
        return this.run('interval', cb, interval)
    }
    clearInterval(timer) {
        cancelAnimationFrame(this._timerIdMap.interval[timer])
    }
}

// 测试
// let raf = new RAF()

// let timer1 = raf.setInterval(() => {
//     console.log(1000)
// }, 1000)

// let timer2 = raf.setInterval(() => {
//     console.log(1500)
// }, 1500)

// raf.setTimeout(() => {
//     raf.clearInterval(timer1)
//     raf.clearInterval(timer2)
// }, 6000)
