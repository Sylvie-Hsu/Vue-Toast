import Vue from 'vue'
import Component from './toast.vue'

const hasOwnProperty = Object.prototype.hasOwnProperty

function hasOwn (obj, key) {
  hasOwnProperty.call(obj, key)
}

function isVNode (node) {
  return node !== null && typeof node === 'object' && hasOwn(node, 'componentOptions')
}

const ToastConstructor = Vue.extend(Component)

let instances = []
let seed = 1

const Toastify = () => {}

Toastify.success = function (info) {
  toastInstance({
    pattern: 'success',
    content: info
  })
}

Toastify.error = function (info) {
  toastInstance({
    pattern: 'error',
    content: info
  })
}

Toastify.alert = function (info) {
  toastInstance({
    pattern: 'alert',
    content: info
  })
}

async function toastInstance (options) {
  const instance = new ToastConstructor({
    data: options
  })

  if (isVNode(options.content)) {
    instance.$slots.default = [options.content]
    options.content = 'REPLACEED_BY_VNODE'
  }

  const id = `toast_${seed++}`
  instance.id = id

  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  instance.vm.visible = true

  instances.forEach(item => {
    instance.verticalOffset += item.$el.offsetHeight + 16
  })

  setTimeout(() => {
    instance.verticalOffset += 16
    return 0
  }, 3)

  instance.vm.$on('closed', () => {
    removeInstance(instance)
    document.body.removeChild(instance.vm.$el)
    instance.vm.$destroy()
  })
  instance.$on('close', () => {
    instance.vm.visible = false
  })
  instances.push(instance)

  return instance.vm
}

const removeInstance = (instance) => {
  if (!instance) return
  let len = instances.length
  const index = instances.findIndex(item => {
    return item.id === instance.id
  })
  instances.splice(index, 1)
  if (len <= 1) return
  const h = instance.vm.height
  for (let i = index; i < len - 1; i++) {
    instances[i].verticalOffset = parseInt(instances[i].verticalOffset - h - 16)
  }
}

// async function gradualHeight (instance) {
//   setTimeout(() => {
//     instance.verticalOffset += 16
//     return 0
//   }, 3)
// }

export default Toastify
