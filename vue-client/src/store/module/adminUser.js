import axios from 'axios'
import store from '@/store'
const state = {
  adminUser: JSON.parse(sessionStorage.getItem('adminUser'))
}

const getters = {}

const mutations = {
  SET_ADMINUSER (state, params) {
    state.adminUser = params
    sessionStorage.setItem('adminUser', JSON.stringify(state.adminUser))
  }
}

const actions = {
  login ({ commit }, { username, password }) {
    return new Promise((resolve, reject) => {
      axios
        .post('/api/login', {
          username,
          password
        })
        .then(res => {
          commit('SET_ADMINUSER', res.data.data)
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  logout ({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .post('/api/logout')
        .then(res => {
          commit('SET_ADMINUSER', '')
          store.commit('router/SET_ROUTER', '')
          store.commit('router/SET_HASGETRULES', false)
          sessionStorage.removeItem('adminUser')
          sessionStorage.removeItem('router')
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
