<template>
  <div class="app-role-create">
    <div class="app-form">
      <label>
        <span>层级</span>
        <select v-model="permissionId">
          <option value="0">顶层模块</option>
          <option v-if="item.type === 1"
                  v-for="item in permissionData"
                  :key="item.id"
                  :value="item.id">{{item.name}}</option>
        </select>
      </label>
      <label>
        <span>路由名</span>

        <p><input type="radio"
                 value="1"
                 v-model="type">模块</p>
        <p><input type="radio"
                 value="2"
                 v-model="type">菜单</p>
        <p><input type="radio"
                 value="3"
                 v-model="type">操作</p>
      </label>
      <label>
        <span>路由名</span>
        <input type="text"
               v-model="name">
      </label>
      <label>
        <span>路由标题</span>
        <input type="text"
               v-model="title">
      </label>
      <label>
        <span></span>
        <button @click="onSubmit()">提交</button>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      permissionId: '',
      permissionData: '',
      name: '',
      title: '',
      type: 1
    }
  },
  methods: {
    onSubmit () {
      this.$axios
        .post('http://localhost:7001/api/permission', {
          permissionId: this.permissionId,
          name: this.name,
          title: this.title,
          type: this.type
        })
        .then(res => {
          console.log(res.data)
          this.$router.push({
            path: '/permission/list'
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    getPermissionData () {
      this.$axios
        .get('http://localhost:7001/api/permissionByCreate')
        .then(res => {
          console.log(res.data)
          this.permissionData = res.data.data
          this.permissionId = this.permissionData[0].id
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.getPermissionData()
  }
}
</script>
