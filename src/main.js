import Vue from 'vue'
import App from './App'

import Toast from './components/toast'

Vue.config.productionTip = false

Vue.use(Toast)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
