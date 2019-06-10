import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import axios from './util/axios'
import Alert from '../src/components/alert/alert.js'
import hasPermission from '@/util/permission'

Vue.config.productionTip = false
Vue.prototype.BASEURL = 'http://localhost:7001'
Vue.prototype.$Alert = Alert
Vue.prototype.$axios = axios
// Vue.prototype.$hasPermission = hasPermission

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
