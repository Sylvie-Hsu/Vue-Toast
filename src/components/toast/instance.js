import Vue from 'vue'
import Component from './toast.vue'

// extend是构造一个组件的语法器：传入参数，返回一个组件
const ToastConstructor = Vue.extend(Component)

let instances = []
let seed = 1

const Toastify = () => {}

Toastify.success = function (info) {
  const pattern = 'success'
  toastInstance(pattern, info)
}

Toastify.error = function (info) {
  const pattern = 'error'
  toastInstance(pattern, info)
}

Toastify.fail = function (info) {
  const pattern = 'fail'
  toastInstance(pattern, info)
}

function toastInstance (pattern, info) {
  // 实例化组件
  const instance = new ToastConstructor({
    propsData: {
      content: info,
      pattern: pattern
    },
    data: {
      autoClose: 3000
    }
  })
  console.log(instance.content)
  const id = `toast_${seed++}`
  instance.id = id

  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  instance.vm.visible = true

  let verticalOffset = 0

  instances.forEach(item => {
    verticalOffset += item.$el.offsetHeight + 16
  })
  verticalOffset += 16
  instance.verticalOffset = verticalOffset
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

export default Toastify
