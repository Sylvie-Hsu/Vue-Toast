import Toast from './toast.vue'
import toastify from './instance'

export default (Vue) => {
  Vue.component(Toast.name, Toast)
  Vue.prototype.$toast = toastify
}
