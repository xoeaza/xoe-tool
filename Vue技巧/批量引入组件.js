// 全局批量引入 创建一个.js文件，并在main.js中引入即可。
import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
const requireComponent = require.context(
  './', //组件所在目录的相对路径
  false, //是否查询其子目录
  /Base[A-Z]\w+\.(vue|js)$/ //匹配基础组件文件名的正则表达式
)
requireComponent.keys().forEach(fileName => {
  // 获取文件名
  var names = fileName
    .split('/')
    .pop()
    .replace(/\.\w+$/, '') //BaseBtn
  // 获取组件配置
  const componentConfig = requireComponent(fileName)
  // 若该组件是通过"export default"导出的，优先使用".default"，
  // 否则退回到使用模块的根
  Vue.component(names, componentConfig.default || componentConfig)
})

// 局部批量引入
// 引入所有需要的动态组件
const requireComponent = require.context(
  './', //组件所在目录的相对路径
  true, //是否查询其子目录
  /\w+\.vue$/ //匹配基础组件文件名的正则表达式
)
var comObj = {}
requireComponent.keys().forEach(fileName => {
  // 获取文件名
  var names = fileName
    .split('/')
    .pop()
    .replace(/\.\w+$/, '')
  // 获取组件配置
  const componentConfig = requireComponent(fileName)
  // 若该组件是通过"export default"导出的，优先使用".default"，否则退回到使用模块的根
  comObj[names] = componentConfig.default || componentConfig
})
export default {
  data() {
    return {}
  },
  mounted() {},
  components: comObj,
}
