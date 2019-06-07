<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
ul,
li {
  list-style: none;
}
a {
  text-decoration: none;
  color: #2c3e50;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.app-form {
  h3 {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 40px;
    width: 100px;
  }
  label {
    display: flex;
    align-items: center;
    height: 40px;
    width: 300px;
    span {
      flex: 0 0 100px;
      width: 100px;
      text-align: right;
      margin-right: 10px;
    }
    input {
      flex: 1;
      height: 30px;
      padding: 0 10px;
      border-radius: 4px;
      outline: none;
      border: 1px solid #ccc;
      &:focus {
        border: 1px solid #00aaee;
      }
    }
  }
  .avatarShow {
    display: flex;
    align-items: center;
    width: 300px;
    span {
      flex: 0 0 100px;
      width: 100px;
      text-align: right;
      margin-right: 10px;
    }
    img {
      width: 100px;
      height: 100px;
      border: 1px solid #ccc;
    }
  }
}
button {
  display: inline-block;
  height: 30px;
  line-height: 30px;
  padding: 0 10px;
  margin: 5px 10px;
  border-radius: 4px;
  outline: none;
  border: 1px solid #ccc;
  &.info {
    background: #00aaee;
    color: #fff;
    border: 1px solid #00aaee;
  }
  &.success {
    background: #00ee8b;
    color: #fff;
    border: 1px solid #00ee8b;
  }
  &.warning {
    background: #ee8700;
    color: #fff;
    border: 1px solid #ee8700;
  }
  &.dialog {
    background: #ee000c;
    color: #fff;
    border: 1px solid #ee000c;
  }
}
table {
  border: 1px solid #ccc;
  width: 100%;
  margin: 0;
  padding: 0;
  border-collapse: collapse;
  border-spacing: 0;
  margin: 0 auto;
}

table tr {
  border: 1px solid #ddd;
  padding: 5px;
}

table th,
table td {
  padding: 10px;
  text-align: center;
  border: 1px solid #ddd;
  img {
    height: 50px;
    width: auto;
  }
}
</style>
