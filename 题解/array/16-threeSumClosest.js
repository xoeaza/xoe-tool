// 给定一个包括 n 个整数的数组 nums 和 一个目标值 target。找出 nums 中的三个整数，使得它们的和与 target 最接近。返回这三个数的和。假定每组输入只存在唯一答案。
// 例如，给定数组 nums = [-1，2，1，-4], 和 target = 1.
// 与 target 最接近的三个数的和为 2.(-1 + 2 + 1 = 2).

const threeSumClosest = function (nums, target) {
    const arr = nums.sort((a, b) => a - b)
    let result
    let left, right
    let tempDifference = arr[0] + arr[1] + arr[2] - target
    arr.map((item, index) => {
        left = index + 1
        right = arr.length - 1
        while (left < right) {
            let difference = item + arr[left] + arr[right] - target
            if (Math.abs(difference) <= Math.abs(tempDifference)) {
                tempDifference = difference
                result = difference + target
            }
            if (difference >= 0)--right
            if (difference < 0)++left
        }
    })
    return result
};