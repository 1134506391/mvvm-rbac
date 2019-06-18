<template>
  <div class="phoneBrands-list">
    <table class="app-tables border center">
      <thead>
        <tr>
          <th>序号</th>
          <th>标题</th>
          <th>描述</th>
          <th>创建时间</th>
          <th>最后修改时间</th>
          <th v-if="adminUser.username=== 'admin'">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in data"
            :key="item.id">
          <td>{{index+1}}</td>
          <td>{{item.title}}</td>
          <td>{{item.description}}</td>
          <td>{{item.createdAt}}</td>
          <td>{{item.updatedAt}}</td>
          <td v-if="adminUser.username=== 'admin'">
            <button @click="openAuth(item.id)"
                    class="info">授权</button>
            <button @click="updateItem(item.id)"
                    class="warning">编辑</button>
            <button @click="delItem(item.id)"
                    class="dialog">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- <button @click="handleOpen1">打开提示 1</button> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      data: ''
    }
  },
  computed: {
    ...mapState({
      adminUser: state => state.adminUser.adminUser
    })
  },
  methods: {
    handleOpen1 () {
      this.$Alert.info({
        content: '我是提示信息 1',
        duration: 2
      })
    },
    getData () {
      this.$axios.get('http://localhost:7001/api/role')
        .then(res => {
          if (res.data.ok) {
            this.data = res.data.data
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateItem (id) {
      this.$router.push({
        path: '/role/update',
        query: {
          id: id
        }
      })
    },
    delItem (id) {
      this.$axios.delete('http://localhost:7001/api/role/' + id)
        .then(res => {
          console.log(res)
          this.getData()
        })
        .catch(err => {
          console.log(err)
        })
    },
    openAuth (id) {
      this.$router.push({
        path: '/role/auth',
        query: {
          id: id
        }
      })
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style>
</style>
