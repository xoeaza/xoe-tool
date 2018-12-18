// 针对五种通信场景，实现五个独立的可以被广泛使用的通信函数
// 通过这五个函数，可以在不依赖vuex，bus的情况下，在各种组件之间通信，这在开发独立组件时尤显重要
/**
 * @msg: 由一个组件，向上找到最近的指定组件
 * @param {context: 基于哪个组件来向上寻找，componentName: 组件名}
 * @return: 符合要求的最近的指定组件
 */
function findComponentUpward(context, componentName) {
  let parent = context.$parent
  let name = parent.$options.name

  while (parent && (!name || [componentName].indexOf(name) < 0)) {
    parent = parent.$parent
    if (parent) name = parent.$options.name
  }
  return parent
}

/**
 * @msg: 由一个组件，向上找到所有的指定组件
 * @param {context: 基于哪个组件来向上寻找，componentName: 组件名}
 * @return: 包含了所有找到的组件实例的数组
 */
function findComponentsUpward(context, componentName) {
  let parents = []
  const parent = context.$parent

  if (parent) {
    if (parent.$options.name === componentName) parents.push(parent)
    return parents.concat(findComponentsUpward(parent, componentName))
  } else {
    return []
  }
}

/**
 * @msg: 由一个组件，向下找到最近的指定组件
 * @param {context: 基于哪个组件来向下寻找，componentName: 组件名}
 * @return: 符合要求的最近的指定组件
 */
function findComponentDownward(context, componentName) {
  //context.$children 得到的是当前组件的全部子组件，所以需要遍历一遍，找到有没有匹配到的组件 name，如果没找到，继续递归找每个 $children 的 $children，直到找到最近的一个为止。
  const childrens = context.$children
  let children = null

  if (childrens.length) {
    for (const child of childrens) {
      const name = child.$options.name

      if (name === componentName) {
        children = child
        break
      } else {
        children = findComponentDownward(child, componentName)
        if (children) break
      }
    }
  }
  return children
}

/**
 * @msg:  由一个组件，向下找到所有指定的组件
 * @param {context: 基于哪个组件来向下寻找，componentName: 组件名}
 * @return: 包含了所有找到的组件实例的数组
 */
function findComponentsDownward(context, componentName) {
  return context.$children.reduce((components, child) => {
    if (child.$options.name === componentName) components.push(child)
    const foundChilds = findComponentsDownward(child, componentName)
    return components.concat(foundChilds)
  }, [])
}

/**
 * @msg: 由一个组件，找到指定组件的兄弟组件
 * @param {context: 基于哪个组件来向上寻找，componentName: 组件名， exceptMe:是否排除本身}
 * @return: 包含了所有找到的组件实例的数组
 */
function findBrothersComponents(context, componentName, exceptMe = true) {
  let res = context.$parent.$children.filter(item => {
    return item.$options.name === componentName
  })
  let index = res.findIndex(item => item._uid === context._uid)
  if (exceptMe) res.splice(index, 1)
  return res
}

// 举一个运用第一个方法，子组件调用父组件方法的小例子
;`<!-- component-a.vue -->
<template>
<div>
  组件 A
  <component-b></component-b>
</div>
</template>
<script>
import componentB from './component-b.vue';

export default {
  name: 'componentA',
  components: { componentB },
  data () {
    return {
      name: 'xoe'
    }
  },
  methods: {
    sayHello () {
      console.log('Hello, Vue.js');
    }
  }
}
</script>

<!-- component-b.vue -->
<template>
  <div>
    组件 B
  </div>
</template>
<script>
  import { findComponentUpward } from '../utils/assist.js';

  export default {
    name: 'componentB',
    mounted () {
      const comA = findComponentUpward(this, 'componentA');
      
      if (comA) {
        console.log(comA.name);  // xoe
        comA.sayHello();  // Hello, Vue.js
      }
    }
  }
</script>`
