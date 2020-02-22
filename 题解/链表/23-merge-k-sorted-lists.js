// 合并 k 个排序链表，返回合并后的排序链表。请分析和描述算法的复杂度。
// 示例:
// 输入:
// [
//   1->4->5,
//   1->3->4,
//   2->6
// ]
// 输出: 1->1->2->3->4->4->5->6

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
    if (lists === null || lists.length === 0) return null

    function mergeTwoList(listA, listB) {
        if (!listA) return listB
        if (!listB) return listA

        let root

        if (listA.val <= listB.val) {
            root = listA
            listA = listA.next
        } else {
            root = listB
            listB = listB.next
        }

        let currentNode = root

        while (listA && listB) {
            if (listA.val <= listB.val) {
                currentNode.next = listA
                listA = listA.next
            } else {
                currentNode.next = listB
                listB = listB.next
            }

            currentNode = currentNode.next
        }

        if (listA) {
            currentNode.next = listA
        }

        if (listB) {
            currentNode.next = listB
        }

        return root
    }

    while (lists.length > 1) {
        lists.push(mergeTwoList(lists.shift(), lists.shift()))
    }

    return lists.shift()
}
