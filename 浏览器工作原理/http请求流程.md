![http请求流程](./img/1b49976aca2c700883d48d927f48986c.png)
浏览器中的 HTTP 请求从发起到结束一共经历了如下八个阶段：
构建请求、查找缓存、准备 IP 和端口、等待 TCP 队列、建立 TCP 连接、发起 HTTP 请求、服务器处理请求、服务器返回请求和断开连接。

查找缓存
DNS 缓存和页面资源缓存这两块数据是会被浏览器缓存的。

等待 TCP 队列
现在已经把端口和 IP 地址都准备好了，那么下一步是不是可以建立 TCP 连接了呢？
答案依然是“不行”。Chrome 有个机制，同一个域名同时最多只能建立 6 个 TCP 连接，如果在同一个域名下同时有 10 个请求发生，那么其中 4 个请求会进入排队等待状态，直至进行中的请求完成。
当然，如果当前请求数量少于 6，会直接进入下一步，建立 TCP 连接。

断开连接
通常情况下，一旦服务器向客户端返回了请求数据，它就要关闭 TCP 连接。不过如果浏览器或者服务器在其头信息中加入了：
Connection:Keep-Alive
那么 TCP 连接在发送后将仍然保持打开状态，这样浏览器就可以继续通过同一个 TCP 连接发送请求。保持 TCP 连接可以省去下次请求时需要建立连接的时间，提升资源加载速度。比如，一个 Web 页面中内嵌的图片就都来自同一个 Web 站点，如果初始化了一个持久连接，你就可以复用该连接，以请求其他资源，而不需要重新再建立新的 TCP 连接。
