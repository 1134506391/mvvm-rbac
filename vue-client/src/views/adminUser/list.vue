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
            <button v-if="hasPermission('adminUserUpdate')"
                    @click="updateItem(item.id)"
                    class="warning">编辑</button>
            <button v-if="hasPermission('adminUserDelete')"
                    @click="delItem(item.id)"
                    class="dialog">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="app-page">
      <button @click="prevPage">上一页</button>
      <span>总页数{{pages}}/</span>
      <span>总条数{{count}}/</span>
      <span>当前第{{page}}页/</span>
      <button @click="nextPage">下一页</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      data: '',
      limit: 3, // 一页多少条,要请求的
      page: 1, // 第几页,要请求的
      pages: 0, // 总页数,返回来的
      count: 0, // 总条数,返回来的
      permissionArr: ''
    }
  },
  computed: {
    ...mapState({
      router: state => state.router.router
    })
  },
  methods: {
    hasPermission (item) {
      return this.permissionArr.includes(item)
    },
    permissionArrFn () {
      let newArr = []
      var i = 0
      function toArr (data) {
        data.forEach((item, index) => {
          newArr[i] = item.name
          i++
          if (item.children) {
            toArr(item.children)
          }
        })
        return newArr
      }
      this.permissionArr = toArr(this.router)
    },
    getData () {
      let params = {}
      if (this.limit) {
        params.limit = this.limit
      }
      if (this.page) {
        params.page = this.page
      }
      this.$axios
        .get('http://localhost:7001/api/adminUser', { params })
        .then(res => {
          console.log(res.data)
          this.data = res.data.data.rows
          this.count = res.data.data.count
          this.pages = Math.ceil(this.count / this.limit)
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
    },
    prevPage () {
      this.page--
      if (this.page < 1) {
        this.page = 1
        return
      }
      this.getData()
    },
    nextPage () {
      this.page++
      if (this.page > this.pages) {
        this.page = this.pages
        return
      }
      this.getData()
    }
  },
  created () {
    this.getData()
    this.permissionArrFn()
  }
}
</script>

<style>
</style>
