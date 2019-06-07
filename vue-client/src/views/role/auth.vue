<template>
  <div>
    <ul class="ul-item">
      <li v-for="(item) in data"
          :key="item.id">
        <label>
          <input disabled
                 type="checkbox"
                 v-model="item.check">
          <span>{{item.title}}</span>
        </label>
        <ul class="ul-item2"
            v-if="item.children && item.children.length >0">
          <li v-for="(item2) in item.children"
              :key="item2.id">
            <label @change="hangleItem2(item2)">
              <input type="checkbox"
                     v-model="item2.check">
              <span>{{item2.title}}</span>
            </label>
            <ul class="ul-item3"
                v-if="item2.children && item2.children.length >0">
              <li v-for="(item3) in item2.children"
                  :key="item3.id">
                <label @change="hangleItem3(item3)">
                  <input type="checkbox"
                         v-model="item3.check">
                  <span>{{item3.title}}</span>
                </label>
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <button @click="postData">确定</button>
      <!-- {{data}} -->
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: '',
      roleId: ''
    }
  },
  methods: {
    byStatusAddCheck (arr) {
      arr.map(item => {
        if (item.status === 1) {
          item.check = true
        } else {
          item.check = false
        }
        if (item.createdAt) {
          delete item.createdAt
        }
        if (item.updatedAt) {
          delete item.updatedAt
        }
        if (item.permissionId) {
          delete item.permissionId
        }
        if (item.type) {
          delete item.type
        }
        if (item.status) {
          delete item.status
        }
        if (item.children && item.children.length > 0) {
          this.byStatusAddCheck(item.children)
        }
      })
      return arr
    },
    getData () {
      this.$axios
        .get('http://localhost:7001/api/permission')
        .then(res => {
          console.log(res.data)
          this.data = this.byStatusAddCheck(res.data.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    postData () {
      let arr = []
      var i = 0
      function toArr (data) {
        data.forEach((item, index) => {
          arr[i] = {
            id: item.id,
            name: item.name,
            check: item.check
          }
          i++
          if (item.children) {
            toArr(item.children)
          }
        })
        return arr
      }
      let result = toArr(this.data).filter(item => item.check)
      result.forEach(item => {
        delete item.check
      })
      this.$axios
        .post('http://localhost:7001/api/auth', {
          roleId: this.roleId,
          data: result
        })
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    hangleItem2 (item2) {
      console.log(item2.check)
    },
    hangleItem3 (item3) {
      console.log(item3.check)
    }
  },
  created () {
    this.roleId = this.$route.query.id
    this.getData()
  }
}
</script>

<style lang="scss">
.ul-item {
  input {
    margin-right: 10px;
  }
  > li {
    > label {
      display: flex;
      align-items: center;
      height: 40px;
      border-bottom: 1px solid #ccc;
    }
    > .ul-item2 {
      > li {
        display: flex;
        align-items: center;
        height: 40px;
        border-bottom: 1px solid #ccc;
        > label {
          width: 200px;
          flex: 0 0 200px;
        }
        > .ul-item3 {
          flex: 1;
          display: flex;
          > li {
            width: 200px;
            flex: 0 0 200px;
          }
        }
      }
    }
  }
}
</style>
