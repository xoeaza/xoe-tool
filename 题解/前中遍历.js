let line
while ((line = read_line())) {
	line = line.split(',').map(item => Number(item))
	pre = line
	vin = read_line()
		.split(',')
		.map(item => Number(item))
}

function TreeNode(x) {
	this.val = x
	this.left = null
	this.right = null
}
// let pre = [1, 2, 4, 5, 3, 6, 7],
//   vin = [4, 2, 5, 1, 6, 3, 7];
function reConstructBinaryTree(pre, vin) {
	let node = new TreeNode()

	function createTree(node, pre, vin) {
		if (pre.length === 0) {
			node.val = null
			return
		}
		let rootnode = pre[0]
		let index = vin.indexOf(rootnode)
		let lchildvinarr = vin.slice(0, index),
			rchildvinarr = vin.slice(index + 1),
			lchildvinlen = lchildvinarr.length,
			rchildvinlen = rchildvinarr.length
		let lchildprearr = pre.slice(1, lchildvinlen + 1),
			rchildprearr = pre.slice(lchildvinlen + 1)
		node.val = rootnode
		node.left = new TreeNode()
		node.right = new TreeNode()
		if (node.val) {
			createTree(node.left, lchildprearr, lchildvinarr)
			createTree(node.right, rchildprearr, rchildvinarr)
		}
	}
	createTree(node, pre, vin)
	return node
}

let result = []
let dfs = function(nodes) {
	if (nodes.val) {
		nodes.left && dfs(nodes.left)
		nodes.right && dfs(nodes.right)
		result.push(nodes.val)
	}
}
let node = reConstructBinaryTree(pre, vin)
dfs(node)

print(result)
console.log(node)
console.log(result)
