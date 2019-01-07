// 大于判断
/* javascript 在判断 a > b 时，记住下面 21 步判断法：

调用 b 的 ToPrimitive(hit Number) 方法.
调用 a 的 ToPrimitive(hit Number) 方法.
如果此时 Result(1) 与 Result(2) 都是字符串，跳到步骤 16.
调用 ToNumber(Result(1)).
调用 ToNumber(Result(2)).
如果 Result(4) 为 NaN, return undefined.
如果 Result(5) 为 NaN, return undefined.
如果 Result(4) 和 Result(5) 是相同的数字，return false.
如果 Result(4) 为 +0， Result(5) 为 -0, return false.
如果 Result(4) 为 -0， Result(5) 为 +0, return false.
如果 Result(4) 为 +∞, return false.
如果 Result(5) 为 +∞, return true.
如果 Result(5) 为 -∞, return false.
如果 Result(4) 为 -∞, return true.
如果 Result(4) 的数值大小小于 Result(5)，return true，否则 return false.
如果 Result(2) 是 Result(1) 的前缀 return false. （比如 "ab" 是 "abc" 的前缀）
如果 Result(1) 是 Result(2) 的前缀, return true.
找到一个位置 k，使得 a[k] 与 b[k] 不相等.
取 m 为 a[k] 字符的数值.
取 n 为 b[k] 字符的数值.
如果 m < n, return true，否则 return false.
ToPrimitive 会按照顺序优先使用存在的值：valueOf()、toString()，如果都没有，会抛出异常。 ToPrimitive(hit Number) 表示隐转数值类型
 所以 null > 0 结果为 false。 */

// 等于判断
/* 现在看看 a == b 时的表现（三等号会严格判断类型，两等号反而是最复杂的情况）。

如果 a 与 b 的类型相同，则：
如果 Type(b) 为 undefined，return true.
如果 Type(b) 为 null，return true.
如果 Type(b) 为 number，则：
如果 b 为 NaN，return false.
如果 a 为 NaN，return false.
如果 a 与 b 数值相同，return true.
如果 a 为 +0，b 为 -0，return true.
如果 a 为 -0，b 为 +0，return true.
否则 return false.
如果 Type(b) 为 string，且 a 与 b 是完全相同的字符串，return true，否则 return false.
如果 Type(b) 是 boolean，如果都是 true 或 false，return true，否则 return false.
如果 a 与 b 是同一个对象引用，return true，否则 return false.
如果 a 为 null，b 为 undefined，return true.
如果 a 为 undefined，b 为 null，return true.
如果 Type(a) 为 number，Type(b) 为 string，返回 a == ToNumber(b) 的结果.
如果 Type(a) 为 string，Type(b) 为 number，返回 ToNumber(a) == b 的结果.
如果 Type(a) 为 boolean，返回 ToNumber(a) == b 的结果.
如果 Type(b) 为 boolean，返回 a == ToNumber(b) 的结果.
如果 Type(a) 是 string 或 number，且 Type(b) 是对象类型，返回 a == ToPrimitive(b) 的结果.
如果 Type(a) 是对象类型，且 Type(b) 是 string 或 number，返回 ToPrimitive(a) == b 的结果.
否则 return false.
所以 null == 0 走到了第 10 步，返回了默认的 false。 */
