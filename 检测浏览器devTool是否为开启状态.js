//关于检测 devTool 是否为打开状态当前已经有好多方案了，比如轮询检测 window 的内外宽高差、对 html 元素注册 id 的 getter 等，但是这些方法要不具有侵入性，要不无法满足 devTool 是悬浮状态的情况，这个方法可能更好一下，亲测 chrome 和 ff 没问题。
// 其实正则，函数，日期都可以，因为控制台会隐式调用这几个 Object 的 toString 方法。
f = function() {}
f.toString = function() {
  // do something when devTool is opened
}
// 使打印出的文字变成透明
console.log('%c', f)
