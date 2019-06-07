import Vue from 'vue'
import Router from 'vue-router'
import { routes } from './router'
import store from '@/store'
Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  let adminUser = JSON.parse(sessionStorage.getItem('adminUser'))
  // let routes2 = JSON.parse(sessionStorage.getItem('routes'))
  if (adminUser) {
    if (!store.state.router.hasGetRules) {
      store
        .dispatch('router/addRouter')
        .then(res => {
          router.addRoutes(res)
          next({ ...to })
        })
        .catch(err => {
          console.log(err)
          next('/login')
        })
    } else {
      next()
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})

// router.beforeEach((to, from, next) => {
//   let adminUser = JSON.parse(sessionStorage.getItem('adminUser'))
//   let routes2 = JSON.parse(sessionStorage.getItem('routes'))
//   if (adminUser) {
//     if (store.state.routes.routes) {
//       console.log('有session')
//       next()
//     } else {
//       console.log('没有session')
//       router.addRoutes(newAddRoutes)
//       store.commit('SET_ROUTES', newAddRoutes)
//       next({ ...to })
//     }
//   } else {
//     if (to.path === '/login') {
//       next()
//     } else {
//       next('/login')
//     }
//   }
// })

export default router
