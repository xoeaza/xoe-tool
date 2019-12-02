// 不定数量的笛卡尔乘积
// 入参为不定数量的数组的数组,const data = [['aa','bb','cc'],['11','22'],['AA','BB','CC','DD'],...]
// 返回数据如下["aa11AA", "aa11BB", "aa11CC", "aa11DD", "aa22AA", ..., "cc22DD"]
const cp = arr => {
  return arr.reduce((a, b) => {
    let result = []
    a.map(v0 => {
      b.map(v1 => {
        result.push('' + v0 + v1)
      })
    })
    return result
  })
}

const data = [
  ['aa', 'bb', 'cc'],
  ['11', '22'],
  ['AA', 'BB', 'CC', 'DD'],
  ['gg', 'ee', 'yyy']
]
console.log(cp(data))
