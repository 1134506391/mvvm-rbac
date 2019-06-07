<template>
  <div class="app-phone-create">
    <div class="app-form">
      <label>
        <span>手机名字</span>
        <input type="text"
               v-model="title">
      </label>
      <label>
        <span>手机描述</span>
        <input type="text"
               v-model="description">
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
      id: '',
      title: '',
      description: ''
    }
  },
  methods: {
    getRoleData () {
      this.$axios
        .get(`http://localhost:7001/api/role?id=${this.id}`)
        .then(res => {
          console.log(res.data)
          this.title = res.data.data[0].title
          this.description = res.data.data[0].description
        })
        .catch(err => {
          console.log(err)
        })
    },
    onSubmit () {
      this.$axios
        .put('http://localhost:7001/api/role', {
          id: this.id,
          title: this.title,
          description: this.description
        })
        .then(res => {
          console.log(res.data)
          this.$router.push({
            path: '/role/list'
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
  }
}
</script>
