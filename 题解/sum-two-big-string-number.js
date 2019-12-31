const addLargeNum = (num1, num2) => {
    if (isNaN(Number(num1)) || isNaN(Number(num1))) return null

    // 去除开头0
    const reg = /^0+/
    num1 = String(num1)
        .replace(reg, '')
        .trim()
    num2 = String(num2)
        .replace(reg, '')
        .trim()

    let i = num1.length - 1
    let j = num2.length - 1

    let carry = 0
    let ret = ''
    while (i >= 0 || j >= 0) {
        let x = 0
        let y = 0

        if (i >= 0) {
            x = +num1[i]
            --i
        }

        if (j >= 0) {
            y = +num2[j]
            --j
        }

        let sum = x + y + carry

        if (sum >= 10) {
            carry = 1
            sum -= 10
        } else {
            carry = 0
        }

        ret = sum + ret
    }

    if (carry) {
        ret = carry + ret
    }

    return ret
}

// 100000000000000000000000000000000000000000000000008
console.log(addLargeNum('99999999999999999999999999999999999999999999999999', '000000000009'))
