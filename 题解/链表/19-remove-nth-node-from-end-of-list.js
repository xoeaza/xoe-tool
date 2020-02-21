// 给定一个链表，删除链表的倒数第 n 个节点，并且返回链表的头结点。
// 示例：
// 给定一个链表: 1->2->3->4->5, 和 n = 2.
// 当删除了倒数第二个节点后，链表变为 1->2->3->5.
// 说明：
// 给定的 n 保证是有效的。

/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    let root = new ListNode()
    let fast = root,
        slow = root
    fast.next = head

    for (let i = 0; i <= n; ++i) {
        fast = fast.next
    }

    while (fast) {
        fast = fast.next
        slow = slow.next
    }

    slow.next = slow.next.next

    return root.next
}
