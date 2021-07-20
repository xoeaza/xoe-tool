// 给定两个字符串 s1 和 s2，写一个函数来判断 s2 是否包含 s1 的排列。
// 换句话说，第一个字符串的排列之一是第二个字符串的 子串 。
// 输入: s1 = "ab" s2 = "eidbaooo"
// 输出: True
// 解释: s2 包含 s1 的排列之一 ("ba").
// 输入: s1= "ab" s2 = "eidboaoo"
// 输出: False

const checkInclusion = function (s1, s2) {
  let len1 = s1.length
  let len2 = s2.length

  let hash = {}
  for (let n of s1) {
    hash[n] = hash[n] ? ++hash[n] : 1
  }

  const fn = (i, len) => {
    if (len === len1) return true
    let val = s2[i]
    if (hash[val]) {
      --hash[val]
      if (fn(i + 1, len + 1)) return true
      ++hash[val]
    }
    return false
  }

  for (let i = 0; i <= len2 - len1; ++i) {
    if (fn(i, 0)) return true
  }

  return false
}

// Solution:
// 步骤如下：
// 1. 将 s1 保存在一个 hash 表中，key 为字母， value 为字母的数量，
// 2. 遍历 s2 的字母，若字母出现在 hash 中而且对应 value 大于 0 ，
//    则递归检查下一个字母，否则回溯（将 hash 中的 value 恢复）
// 3. 若检查的字母长度刚好为 s1 的长度，则返回 true。
