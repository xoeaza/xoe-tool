// 给定一个二叉树，检查它是否是镜像对称的。
// 例如，二叉树 [1,2,2,3,4,4,3] 是对称的。
//     1
//    / \
//   2   2
//  / \ / \
// 3  4 4  3
// 但是下面这个 [1,2,2,null,3,null,3] 则不是镜像对称的:
//     1
//    / \
//   2   2
//    \   \
//    3    3
// 说明:
// 如果你可以运用递归和迭代两种方法解决这个问题，会很加分。

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function(root) {
    if (root === null) return true

    function iter(left, right) {
        if (left === right) return true
        if (left && right && left.val === right.val) {
            return iter(left.left, right.right) && iter(left.right, right.left)
        }
        return false
    }

    return iter(root.left, root.right)
}
