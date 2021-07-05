// 给定两个字符串 text1 和 text2，返回这两个字符串的最长 公共子序列 的长度。如果不存在 公共子序列 ，返回 0 。
// 一个字符串的 子序列 是指这样一个新的字符串：它是由原字符串在不改变字符的相对顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。
// 例如，"ace" 是 "abcde" 的子序列，但 "aec" 不是 "abcde" 的子序列。
// 两个字符串的 公共子序列 是这两个字符串所共同拥有的子序列。

// 输入：text1 = "abcde", text2 = "ace"
// 输出：3
// 解释：最长公共子序列是 "ace" ，它的长度为 3 。

// DPtable实现
const longestCommonSubsequence = function (str1, str2) {
  let s1 = str1.length
  let s2 = str2.length

  let dp = new Array(s1 + 1)
  for (let i = 0; i < s1 + 1; ++i) {
    dp[i] = new Array(s2 + 1)
    dp[i].fill(0)
  }

  for (let i = 1; i < s1 + 1; ++i) {
    for (let j = 1; j < s2 + 1; ++j) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = 1 + dp[i - 1][j - 1]
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
      }
    }
  }

  return dp[s1][s2]
}

//暴力解法+备忘录优化
const longestCommonSubsequence2 = (str1, str2) => {
  let s1 = str1.length
  let s2 = str2.length

  let memo = new Map()

  let dp = (i, j) => {
    if (i === -1 || j === -1) {
      return 0
    }

    let key = i + ',' + j

    if (memo.get(key)) {
      return memo.get(key)
    }

    let res
    if (str1[i] === str2[j]) {
      res = dp(i - 1, j - 1) + 1
    } else {
      res = Math.max(dp(i, j - 1), dp(i - 1, j))
    }
    memo.set(key, res)
    return res
  }

  return dp(s1 - 1, s2 - 1)
}
