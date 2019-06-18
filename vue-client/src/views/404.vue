<template>
  <div>
    对不起，你没有权限仿问，请联系超级管理员
    <p @click='prev'>点击返回上一页</p>
  </div>
</template>
<script>
export default {
  methods: {
    prev () {
      this.$router.go(-2)
    }
  }
}
</script>
<style lang="scss">
p {
  cursor: pointer;
  &:hover {
    color: #ff0000;
  }
}
</style>
