async function errorCaptured(asyncFunc) {
  try {
    let res = await asyncFunc()
    return [null, res]
  } catch (e) {
    return [e, null]
  }
}

// 调用
let [err, res] = await errorCaptured(asyncFunc)