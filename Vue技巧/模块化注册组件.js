// elementComponent.js
import {
  Input,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Select
  // 还有很多组件
} from 'element-ui'

const components = {
  Input,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Select
}
function install(Vue){
  Object.keys(components).forEach(key => Vue.use(components[key]))
}
export default { install }


// main.js
import Vue from 'vue'
import elementComponent from './config/elementComponent'
Vue.use(elementComponent)