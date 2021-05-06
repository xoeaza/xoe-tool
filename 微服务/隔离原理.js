// 1. js脚本隔离
// Prxoy 沙箱的基本原理是通过 with + new Function 的形式阻断代码中对于 window 的直接访问，并通过 Proxy 的方式拦截对于 window 变量的访问和写入，
// 沙箱的隔离使代码不能直接访问到 window 对象，通过ES6 的新特性 Proxy 可以定制 get/set 的逻辑，这样就能对 window 上的一些全局变量变化进行快照记录，以便微应用切换的时候进行恢复。

const sandbox = new Proxy(Object.create(null), {
  get() {},
  set() {},
  has() {}
  ...
})

const execScript = `with (sandbox) {;${script}\n}`
const execCode = new Function('sandbox', execScript)
execCode(sandbox)


// 2. 样式隔离
// 一块通常是开发者自己业务代码中的样式隔离，业务代码的隔离推荐通过 CSSModule 的方式，能够自动生成 hash 后缀的样式名，基于每个不同的应用构建出来的样式，在天然上就能够做到隔离。
// 另外一块是基础组件样式隔离，使用 CSS prefix 的方式，可以为所有样式添加一个前缀，在实践过程中将框架应用的前缀和微应用前缀进行区分，来完成样式的隔离。
// 如果有不支持 CSS prefix 的样式，也能够借助社区 PostCSS 的能力给组件样式加上 namespace，框架应用跟微应用通过不同的 namespace 进行样式隔离。