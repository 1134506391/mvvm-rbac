import Vue from 'vue'
import Vuex from 'vuex'
import adminUser from './module/adminUser'
import router from './module/router'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: false,
  modules: {
    adminUser,
    router
  }
})
