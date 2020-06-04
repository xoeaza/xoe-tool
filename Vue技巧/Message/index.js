import Vue from 'vue'
import Index from './index.vue'

let messageInstance = null
let MessageConstructor = Vue.extend(Index)

let init = () => {
    messageInstance = new MessageConstructor()
    messageInstance.$mount()
    document.body.appendChild(messageInstance.$el)
}

let caller = (options) => {
    if (!messageInstance) {
        init(options)
    }
    messageInstance.add(options)
}

export default {
    // 返回 install 函数 用于 Vue.use 注册
    install(vue) {
        vue.prototype.$message = caller
    }
}

/* // main.js
import Message from '@/components/Message/index.js'

Vue.use(Message)
// 使用
this.$message({
    type: 'success',
    content: '成功信息提示',
    duration: 3000
}) */