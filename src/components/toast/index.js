import Toast from './toast.vue'
import toastify from './instance'

export default (Vue) => {
  // 注册全局组件
  Vue.component(Toast.name, Toast)
  // 添加全局API
  Vue.prototype.$toast = toastify
}
