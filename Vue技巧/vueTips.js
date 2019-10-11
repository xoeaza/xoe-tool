// 引入全局组件只维护 index.js 文件
// index.js 文件
import A from '@/component/A'
A.install = function(Vue) {
	Vue.component(A.name, A)
}
function InstallAll(Vue) {
	Vue.use(A)
}
export { A, InstallAll }
// main.js 文件
import { InstallAll } from './components/index'
InstallAll(Vue)
