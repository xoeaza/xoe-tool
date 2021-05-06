// 通过路由劫持的方法来监听路由的变化，劫持的内容包括了 history API 中的 pushState 和 replaceState，
// 以及 window 浏览器路由事件 popstate 和 hashChange。一旦路由发生变化后通过劫持拿到 url 变化信息，
// 再根据微应用注册的路由规则进行匹配。如果匹配成功，读取该微应用设置的资源信息进行加载