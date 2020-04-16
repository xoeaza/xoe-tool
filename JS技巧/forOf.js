/* 迭代大型数组时，for...of 的执行速度可能会比经典方法慢 */

/* 1. 数组迭代 */
const products = ['oranges', 'apples']
for (const product of products) {
  console.log(product)
}
// 'oranges'
// 'apples'

/* 2.解构 */
const persons = [{ name: 'John Smith' }, { name: 'Jane Doe' }]
for (const { name } of persons) {
  console.log(name)
}
// 'John Smith'
// 'Jane Doe'

/* 3.类数组迭代 */
function sum() {
  let sum = 0
  for (const number of arguments) {
    sum += number
  }
  return sum
}
sum(1, 2, 3) // => 6

/* 4.字符串迭代 */
const message = 'hello'
for (const character of message) {
  console.log(character)
}
// 'h'
// 'e'
// 'l'
// 'l'
// 'o'

/* 5. Map 和 Set 迭代 */
const names = new Map()
names.set(1, 'one')
names.set(2, 'two')
for (const [number, name] of names) {
  console.log(number, name)
}
// 1, 'one'
// 2, 'two'

const colors = new Set(['white', 'blue', 'red', 'white'])
for (color of colors) {
  console.log(color)
}
// 'white'
// 'blue'
// 'red'

/* 6. 迭代普通的JavaScript对象 */
const person = {
  name: 'John Smith',
  job: 'agent',
}
for (const [prop, value] of Object.entries(person)) {
  console.log(prop, value)
}
// 'name', 'John Smith'
// 'job', 'agent'

/* 7. 遍历DOM集合 */
const children = document.body.children
for (const child of children) {
  console.log(child) // logs each child of <body>
}

const allImages = document.querySelectorAll('img')
for (const image of allImages) {
  console.log(image) // log each image in the document
}
