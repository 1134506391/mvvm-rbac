<template>
  <div class="app-role-create">
    <div class="app-form">
      <label>
        <span>角色标题</span>
        <input type="text"
               v-model="title">
      </label>
      <label>
        <span>角色描述</span>
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
      title: '',
      description: ''
    }
  },
  methods: {
    onSubmit () {
      this.$axios
        .post('http://localhost:7001/api/role', {
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
  }
}
</script>
