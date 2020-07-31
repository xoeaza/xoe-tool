async function errorCaptured(asyncFunc) {
  try {
    let res = await asyncFunc()
    return [null, res]
  } catch (e) {
    return [e, null]
  }
}

// 调用
async function func() {
  let [err, res] = await errorCaptured(asyncFunc)
  if (err) {
      //... 错误捕获
  }
  //...
}