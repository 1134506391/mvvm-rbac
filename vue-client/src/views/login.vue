<template>
  <div class="app-login">
    <div class="app-form">
      <h3>后台登录</h3>
      <label>
        <span>用户名</span>
        <input type="text"
               v-model="username">
      </label>
      <label>
        <span>密码</span>
        <input type="text"
               v-model="password">
      </label>
      <label>
        <span></span>
        <button class="info"
                @click="loginAction()">登录</button>
        <button class="app-btn-blue"
                @click="openRegister()">注册</button>
      </label>

    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  computed: {
    ...mapState({
      routes: state => state.routes.routes
    })
  },
  methods: {
    ...mapActions('adminUser', ['login']),
    loginAction () {
      this.login({
        username: this.username,
        password: this.password
      })
        .then(res => {
          console.log(res)
          if (res.data.ok) {
            this.$router.push({
              path: '/'
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    openRegister () {
      this.$router.push({
        path: '/register'
      })
    }
  }
}
</script>
