// 最长回文子串
// 输入：s = "cbbd" 输出："bb"
const huiweng = (str, l, r) => {
  const len = str.length
  while (l >= 0 && r <= len - 1 && str[l] === str[r]) {
    --l
    ++r
  }
  return str.substr(l + 1, r - l - 1)
}

const longestPalindrome = function (str) {
  const len = str.length
  let res = ''
  for (let i = 0; i < len; ++i) {
    let res1 = huiweng(str, i, i)
    let res2 = huiweng(str, i, i + 1)

    let temp = res1.length > res2.length ? res1 : res2
    res = res.length > temp.length ? res : temp
  }
  return res
}
