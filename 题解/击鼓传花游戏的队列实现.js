// 定义一个基础队列
let Queque = (function() {
  // 实现私有属性
  const item = new WeakMap()

  class Queque {
    constructor() {
      item.set(this, [])
    }

    enqueque(element) {
      let q = item.get(this)
      q.push(element)
    }
    dequeque() {
      let q = item.get(this)
      return q.shift()
    }
    size() {
      let q = item.get(this)
      return q.length
    }
  }
  return Queque
})()

// 在击鼓传花游戏中，孩子们围成一个圈，把花尽快的递给旁边的人。某一时刻传花停止，这时候花在谁手上，谁就被淘汰退出游戏。重复这个过程直达只剩一个孩子（winner）
// 击鼓传花游戏的队列实现
let hotPotato = (arr, num) => {
  let queque = new Queque()
  for (let item of arr) {
    queque.enqueque(item)
  }
  while (queque.size() > 1) {
    for (let i = 0; i < num; i++) {
      queque.enqueque(queque.dequeque())
    }
    let out = queque.dequeque()
    console.log(out + '被淘汰了')
  }
  return queque.dequeque()
}

let names = ['a', 'b', 'c', 'd', 'e', 'f']
let winner = hotPotato(names, 9)
console.log('胜利者是' + winner)
