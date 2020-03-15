// 栈溢出函数改造
function runStack(n) {
    if (n === 0) return 100
    return runStack(n - 2)
}
runStack(50000)

// 改造一
function runStack(n) {
    if (n === 0) return 100
    return runStack.bind(null, n - 2) // 返回自身的一个版本
}
// 蹦床函数，避免递归
function trampoline(f) {
    while (f && f instanceof Function) {
        f = f()
    }
    return f
}
trampoline(runStack(1000000))
