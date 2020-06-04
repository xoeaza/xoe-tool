// watch触发监听执行多个方法
watch: {
  name: [
      'sayName1',
      function(newVal, oldVal) {
          this.sayName2()
      },
      {
          handler: 'sayName3',
          immaediate: true
      }
  ]
}
// ===================================================
// 自定义事件
// 在自定义事件中表现为捕获从子组件抛出的值
// my-item.vue :
export default {
    methods: {
        customEvent() {
            this.$emit('custom-event', 'some value')
        }
    }
}

// App.vue
<template>
    <div>
      <my-item v-for="(item, index) in list" @custom-event="customEvent(index, $event)">
    </div>
</template>
export default {
    methods: {
        customEvent(index, e) {
            console.log(e) // 'some value'
        }
    }
}
// ===================================================
// 自定义组件双向绑定
// 组件 model 选项:
// 允许一个自定义组件在使用 v-model 时定制 prop 和 event。默认情况下，一个组件上的 v-model 会把 value 用作 prop 且把 input 用作 event，但是一些输入类型比如单选框和复选框按钮可能想使用 value prop 来达到不同的目的。使用 model 选项可以回避这些情况产生的冲突。
// input 默认作为双向绑定的更新事件，通过 $emit 可以更新绑定的值
<my-switch v-model="val"></my-switch>
export default {
    props: {
        value: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        switchChange(val) {
            this.$emit('input', val)
        }
    }
}
{/* 修改组件的 model 选项，自定义绑定的变量和事件 */}
<my-switch v-model="num" value="some value"></my-switch>
export default {
    model: {
        prop: 'num',
        event: 'update'
    },
    props: {
        value: {
            type: String,
            default: ''
        },
        num: {
            type: Number,
            default: 0
        }
    },
    methods: {
        numChange() {
            this.$emit('update', this.num++)
        }
    }
}
// ===================================================
{/* 监听组件生命周期
通常我们监听组件生命周期会使用 $emit ，父组件接收事件来进行通知
子组件 */}
export default {
    mounted() {
        this.$emit('listenMounted')
    }
}
// 父组件
<template>
    <div>
        <List @listenMounted="listenMounted" />
    </div>
</template>
// 其实还有一种简洁的方法，使用 @hook 即可监听组件生命周期，组件内无需做任何改变。同样的， created 、 updated 等也可以使用此方法。
<template>
    <List @hook:mounted="listenMounted" />
</template>


// 程序化的事件侦听器
export default {
  mounted() {
      this.creatInterval('hello')
      this.creatInterval('world')
  },
  creatInterval(msg) {
      let timer = setInterval(() => {
          console.log(msg)
      }, 1000)
      this.$once('hook:beforeDestroy', function() {
          clearInterval(timer)
      })
  }
}

// 手动挂载组件
import Vue from 'vue'
import Message from './Message.vue'

// 构造子类
let MessageConstructor = Vue.extend(Message)
// 实例化组件
let messageInstance = new MessageConstructor()
// $mount可以传入选择器字符串，表示挂载到该选择器
// 如果不传入选择器，将渲染为文档之外的的元素，你可以想象成 document.createElement()在内存中生成dom
messageInstance.$mount()
// messageInstance.$el获取的是dom元素
document.body.appendChild(messageInstance.$el)
// ===================================================
// 路由参数解耦
const router = new VueRouter({
  routes: [{
      path: '/user/:id',
      component: User,
      props: true
  }]
})
// 将路由的 props 属性设置为 true 后，组件内可通过 props 接收到 params 参数
export default {
  props: ['id'],
  methods: {
      getParamsId() {
          return this.id
      }
  }
}
// 另外你还可以通过函数模式来返回 props
const router = new VueRouter({
  routes: [{
      path: '/user/:id',
      component: User,
      props: (route) => ({
          id: route.query.id
      })
  }]
})
// ===================================================
// 函数式组件
// 函数式组件是无状态，它无法实例化，没有任何的生命周期和方法。创建函数式组件也很简单，只需要在模板添加 functional 声明即可。一般适合只依赖于外部数据的变化而变化的组件，因其轻量，渲染性能也会有所提高。
// 组件需要的一切都是通过 context 参数传递。它是一个上下文对象，具体属性查看文档。这里 props 是一个包含所有绑定属性的对象。
// 函数式组件
<template functional>
    <div class="list">
        <div class="item" v-for="item in props.list" :key="item.id" @click="props.itemClick(item)">
            <p>{{item.title}}</p>
            <p>{{item.content}}</p>
        </div>
    </div>
</template>
父组件使用
<template>
    <div>
        <List :list="list" :itemClick="item => (currentItem = item)" />
    </div>
</template>
import List from '@/components/List.vue'
export default {
    components: {
        List
    },
    data() {
        return {
            list: [{
                title: 'title',
                content: 'content'
            }],
            currentItem: ''
        }
    }
}