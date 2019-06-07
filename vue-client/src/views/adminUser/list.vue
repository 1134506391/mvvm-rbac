<template>
  <div class="phoneBrands-list">
    <table>
      <thead>
        <tr>
          <th>序号</th>
          <th>头像</th>
          <th>角色</th>
          <th>管理员名字</th>
          <th>电话号码</th>
          <th>创建时间</th>
          <th>最后修改时间</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in data"
            :key="item.id">
          <td>{{index+1}}</td>
          <td>
            <img :src="'http://localhost:7001' + item.avatar"
                 alt="">
          </td>
          <td>{{item.role.title}}</td>
          <td>{{item.username}}</td>
          <td>{{item.phone}}</td>
          <td>{{item.createdAt}}</td>
          <td>{{item.updatedAt}}</td>
          <td>
            <button @click="updateItem(item.id)"
                    class="warning">编辑</button>
            <button @click="delItem(item.id)"
                    class="dialog">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: ''
    }
  },
  methods: {
    getData () {
      this.$axios
        .get('http://localhost:7001/api/adminUser')
        .then(res => {
          console.log(res.data)
          this.data = res.data.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateItem (id) {
      this.$router.push({
        path: '/adminUser/update',
        query: {
          id: id
        }
      })
    },
    delItem (id) {
      this.$axios
        .delete('http://localhost:7001/api/adminUser/' + id)
        .then(res => {
          console.log(res)
          this.getData()
        })
        .catch(err => {
          console.log(err)
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
