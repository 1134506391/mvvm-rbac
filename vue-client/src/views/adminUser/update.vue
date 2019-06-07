<template>
  <div class="app-phone-create">
    <div class="app-form">
      <label>
        <span>管理员角色</span>
        <select v-model="roleId">
          <option v-for="item in roleData"
                  :key="item.id"
                  :value="item.id">{{item.title}}</option>
        </select>
      </label>
      <label>
        <span>用户名</span>
        <input type="text"
               v-model="username">
      </label>
      <label>
        <span>用户密码</span>
        <input type="text"
               v-model="password">
      </label>
      <label>
        <span>用户手机号码</span>
        <input type="text"
               v-model="phone">
      </label>
      <label v-if="!avatar">
        <span>用户头像</span>
        <input v-if="!avatarShow"
               type="file"
               @change="uploadImg($event)">
      </label>
      <div v-else>
        <img v-if="avatar && avatarShow"
             :src="avatarShow"
             alt="">
        <img v-else
             :src="'http://localhost:7001'+this.avatar"
             alt="">
        <span @click="delNowImg">xxxxx</span>
      </div>
      <label>
        <span></span>
        <button @click="onSubmit()">提交</button>
      </label>
    </div>
    <!-- {{avatar}}///{{avatarShow}} -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      id: '',
      username: '',
      password: '',
      avatar: '',
      phone: '',
      avatarShow: '',
      roleData: [],
      roleId: ''
    }
  },
  methods: {
    getRoleData () {
      this.$axios
        .get('http://localhost:7001/api/role')
        .then(res => {
          console.log(res.data)
          this.roleData = res.data.data
          //   this.roleId = this.roleData[0].id
        })
        .catch(err => {
          console.log(err)
        })
    },
    getData () {
      this.$axios
        .get(`http://localhost:7001/api/adminUser/${this.id}`)
        .then(res => {
          console.log(res.data)
          this.data = res.data
          this.username = res.data.data.username
          this.password = res.data.data.password
          this.avatar = res.data.data.avatar
          this.phone = res.data.data.phone
          this.roleId = res.data.data.roleId
        })
        .catch(err => {
          console.log(err)
        })
    },
    uploadImg (event) {
      this.avatar = event.target.files[0]
      var windowURL = window.URL || window.webkitURL
      this.avatarShow = windowURL.createObjectURL(event.target.files[0])
    },
    delNowImg () {
      this.avatarShow = '';
      this.avatar = '';
    },
    onSubmit () {
      let formData = new FormData()
      let data = JSON.stringify({
        id: this.id,
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
        .put('http://localhost:7001/api/adminUser', formData, config)
        .then(res => {
          console.log(res.data)
          this.$router.push({
            path: '/adminUser/list'
          })
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.id = this.$route.query.id
    this.getRoleData()
    this.getData()
  }
}
</script>
