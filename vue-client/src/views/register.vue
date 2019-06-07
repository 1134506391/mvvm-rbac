<template>
  <div class="app-phone-create">
    <div class="app-form">
      <h3>管理员注册</h3>
      <label>
        <span>管理员角色</span>
        <select v-model="roleId">
          <option v-if="item.id !==2 && item.id !== 5"
                  v-for="item in roleData"
                  :key="item.id"
                  :value="item.id">{{item.title}}</option>
        </select>
      </label>
      <label>
        <span>名字</span>
        <input type="text"
               v-model="username">
      </label>
      <label>
        <span>密码</span>
        <input type="text"
               v-model="password">
      </label>
      <label>
        <span>手机号码</span>
        <input type="text"
               v-model="phone">
      </label>
      <label v-if="!avatarShow">
        <span>头像</span>
        <input type="file"
               @change="uploadImg($event)">
      </label>
      <div v-else
           class='avatarShow'>
        <span>头像</span>
        <img :src="avatarShow"
             alt="">
        <!-- <span @click="delNowImg()">删除</span> -->
        <button @click="delNowImg()"
                class="dialog">删除</button>
      </div>
      <label>
        <span></span>
        <button class="info"
                @click="onSubmit()">注册</button>
        <button class="success"
                @click="openLogin()">返回登录</button>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      roleData: [],
      roleId: '',
      username: '',
      password: '',
      avatar: '',
      phone: '',
      avatarShow: ''
    }
  },
  methods: {
    uploadImg (event) {
      this.avatar = event.target.files[0]
      var windowURL = window.URL || window.webkitURL
      this.avatarShow = windowURL.createObjectURL(event.target.files[0])
    },
    delNowImg () {
      this.avatarShow = ''
      this.avatar = ''
    },
    getRoleData () {
      this.$axios
        .get('http://localhost:7001/api/role')
        .then(res => {
          console.log(res.data)
          this.roleData = res.data.data
          this.roleId = this.roleData[3].id
        })
        .catch(err => {
          console.log(err)
        })
    },
    onSubmit () {
      let formData = new FormData()
      let data = JSON.stringify({
        roleId: this.roleId,
        username: this.username,
        password: this.password,
        phone: this.phone
      })
      formData.append('avatar', this.avatar)
      formData.append('data', data)

      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      this.$axios
        .post('http://localhost:7001/api/adminUser', formData, config)
        .then(res => {
          console.log(res.data)
          this.$router.push({
            path: '/login'
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    openLogin () {
      this.$router.push({
        path: '/login'
      })
    }
  },
  created () {
    this.getRoleData()
  }
}
</script>
