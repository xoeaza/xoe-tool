// 给定一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？找出所有满足条件且不重复的三元组。
// 注意：答案中不可以包含重复的三元组。

const threeSum = function (nums) {
    let result = []
    const arr = nums.sort((a, b) => a - b)
    let left, right
    arr.map((item, index) => {
        left = index + 1
        right = arr.length - 1
        if (item !== arr[index - 1]) {
            while (left < right) {
                let sum = arr[left] + arr[right] + item
                if (sum === 0) {
                    result.push([item, arr[left], arr[right]])
                    while (arr[left] === arr[left + 1] && left < right)++left
                    while (arr[right] === arr[right - 1] && left < right)--right
                    ++left
                    --right
                }
                if (sum > 0)--right
                if (sum < 0)++left
            }
        }
    })
    return result
};