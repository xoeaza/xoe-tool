// 1. 归并排序
const merge = (left, right) => {
    let result = []
    let i = 0
    let j = 0

    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            result.push(left[i])
            i++
        } else {
            result.push(right[j])
            j++
        }
    }

    while (i < left.length) {
        result.push(left[i])
        i++
    }

    while (j < right.length) {
        result.push(right[j])
        j++
    }

    return result
}

const mergeSort = arr => {
    const len = arr.length
    if (len === 1) return arr

    const middle = Math.floor(len / 2)
    let leftArr = arr.slice(0, middle)
    let rightArr = arr.slice(middle, len)

    return merge(mergeSort(leftArr), mergeSort(rightArr))
}

// 简易快排
function quickSort(arr) {
    if (arr.length <= 1) {
        return arr
    }
    let left = [],
        right = [],
        baseDot = Math.round(arr.length / 2),
        base = arr.splice(baseDot, 1)[0]

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < base) {
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }

    return quickSort(left).concat([base], quickSort(right))
}
