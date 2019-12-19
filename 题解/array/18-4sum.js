// 给定一个包含 n 个整数的数组 nums 和一个目标值 target，判断 nums 中是否存在四个元素 a，b，c 和 d ，使得 a + b + c + d 的值与 target 相等？找出所有满足条件且不重复的四元组。
// 注意：
// 答案中不可以包含重复的四元组。
// 示例：
// 给定数组 nums = [1, 0, -1, 0, -2, 2]，和 target = 0。
// 满足要求的四元组集合为：
// [
//     [-1, 0, 0, 1],
//     [-2, -1, 1, 2],
//     [-2, 0, 0, 2]
// ]

const fourSum = function (nums, target) {
    let result = []
    const len = nums.length
    if (nums == null || len < 4) return result;
    nums.sort((a, b) => a - b)
    for (let i = 0; i < len; ++i) {
        if (nums[i] === nums[i - 1]) continue
        for (let j = len - 1; j > i + 1; --j) {
            if (nums[j] === nums[j + 1]) continue
            let left = i + 1
            let right = j - 1
            while (left < right) {
                let sum = nums[i] + nums[left] + nums[right] + nums[j]
                if (sum === target) {
                    result.push([nums[i], nums[left], nums[right], nums[j]])
                    while (nums[left] === nums[left + 1] && left < right)++left
                    while (nums[right] === nums[right - 1] && left < right)--right
                    ++left
                    --right
                }
                else if (sum < target)++left
                else if (sum > target)--right
            }
        }
    }
    return result
};