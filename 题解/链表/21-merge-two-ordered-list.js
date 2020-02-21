// 将两个有序链表合并为一个新的有序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。

// 示例：

// 输入：1->2->4, 1->3->4
// 输出：1->1->2->3->4->4

const mergeTwoLists = function(l1, l2) {
    if (l1 === null) return l2
    if (l2 === null) return l1

    let root

    if (l1.val <= l2.val) {
        root = l1
        l1 = l1.next
    } else {
        root = l2
        l2 = l2.next
    }

    let current = root

    while (l1 !== null && l2 !== null) {
        if (l1.val <= l2.val) {
            current.next = l1
            l1 = l1.next
        } else {
            current.next = l2
            l2 = l2.next
        }

        current = current.next
    }

    if (l1 === null) {
        current.next = l2
    }

    if (l2 === null) {
        current.next = l1
    }

    return root
}
