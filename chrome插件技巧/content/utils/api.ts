export function getInterface(path: string) {
  return fetch(path)
    .then(res => res.json())
    .then(res => {
      if (res.errcode === 0 && res.data) {
        return res.data
      } else {
        throw new Error()
      }
    })
    .catch(() => {
      alert('请求接口错误')
      throw new Error()
    })
}