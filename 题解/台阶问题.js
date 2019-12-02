// 运用递归计算有n个台阶，每次只能走1，2步，共有多少种走法。
let haveSolvedList = {}
function f(n) {
  if (n === 1) return 1
  if (n === 2) return 2
  let ret = f(n - 1) + f(n - 2)
  // 运用散列表来存储已求解值, 避免重复计算
  if (haveSolvedList[n]) {
    return haveSolvedList[n]
  }
  haveSolvedList[n] = ret
  return ret
}
console.log(f(32)) //3524578


// 非递归迭代写法, 其实这种写法本质未变，是手动模拟了递归过程
function ff(n) {
  if (n === 1) return 1
  if (n === 2) return 2
  let ret = 0
  let prepre = 1
  let pre = 2
  for (let i = 3; i <= n; i++) {
    ret = pre + prepre
    prepre = pre
    pre = ret
  }
  return ret
}

console.log(ff(32)) //3524578

// 多维数组
let arr = [
  [1, 2, 3, 4],
  [3, 4, 6, 'a', ['q', 'w', 'e']],
  [1, 'p', 6, 6, [1, 2, 3, [1, 2, 3, [1, 2, 3, 2, 3]]]],
  1, 2, 3, 4,
  { a: 1, b: 2 },
];
//多维数组扁平化递归的实现
function deepFlatten(arr) {
  let result = [];
  function recursive(innerArr) {
    innerArr.forEach((v, i) => {
      if (Array.isArray(v)) {
        recursive(v);
      }
      else {
        result.push(v);
      }
    });
  }
  recursive(arr);
  return result;
}
console.log(deepFlatten(arr));

// 未排序数组中连续的最长数组输出
const fn = (arr) => {
  let maxLen = 1
  let tempLen = 1
  let lastIndex
  let arrInOrder = [...new Set(arr.sort((a, b) => a - b))]
  for (let i = 1, len = arrInOrder.length; i < len; i++) {
    if (arrInOrder[i] - arrInOrder[i - 1] === 1) {
      tempLen += 1
      if (tempLen > maxLen) {
        maxLen = tempLen
        lastIndex = i
      }
    } else {
      tempLen = 1
    }
  }
  return arrInOrder[lastIndex - maxLen + 1] + '-->' + arrInOrder[lastIndex]
}

const arr = [1, 11, 2, 30, 6, 8, 7, 9, 10]
console.log(fn(arr)) //6-->11