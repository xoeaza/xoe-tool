koa 为了能够简化 API，引入了上下文 context 的概念，将原始的请求对象 req 和响应对象 res 封装并挂载到了 context 上，并且设置了 getter 和 setter 

Koa 中间键机制：Koa 中间件机制就是函数组合的概念，将一组需要顺序执行的函数复合为一个函数，外层函数的参数实际是内层函数的返回值。洋葱圈模型可以形象表示这种机制，是 Koa 源码中的精髓和难点。
compose函数要实现同步，异步函数组合

1、 koa洋葱模型怎么实现的
app.use() 把中间件函数存储在middleware数组中，最终会调用koa-compose导出的函数compose返回一个promise，中间函数的第一个参数ctx是包含响应和请求的一个对象，会不断传递给下一个中间件。next是一个函数，返回的是一个promise

2、如果中间件中的next()方法报错了怎么办。
中间件链错误会由ctx.onerror捕获，该函数中会调用this.app.emit('error', err, this)（因为koa继承自events模块，所以有'emit'和on等方法），可以使用app.on('error', (err) => {})，或者app.onerror = (err) => {}进行捕获。

3、co的原理是怎样的。
答：co的原理是通过不断调用generator函数的next方法来达到自动执行generator函数的，类似async、await函数自动执行。