<template>
  <div class="admin-layout">
    <nav class="layout-nav">
      <ul>
        <li v-for="item in router"
            v-if="item.meta.type===2"
            :key="item.id">
          <router-link :to="item.path">{{item.meta.title}}</router-link>
          <ul v-if="item.children">
            <li v-for="item2 in item.children"
                v-if="item2.meta.type===2"
                :key="item2.id">
              <router-link :to="item2.path">{{item2.meta.title}}</router-link>
              <ul v-if="item2.children">
                <li v-for="item3 in item2.children"
                    v-if="item3.meta.type===2"
                    :key="item3.id">
                  <router-link :to="item3.path">{{item3.meta.title}}</router-link>
                </li>
              </ul>
            </li>

          </ul>
        </li>
      </ul>
    </nav>
    <header class="layout-header">
      <ul class="header-left">
        <li v-for="(item,index) in $route.meta.breadCrumb"
            :key="item.id">
          <router-link :to="item.path">{{item.title}} <span v-if="index !== $route.meta.breadCrumb.length-1">/</span> </router-link>
        </li>
      </ul>
      <div class="
                  header-right">
        <img :src="BASEURL + adminUser.avatar"
             alt="">
        <span>{{adminUser.username}}</span>
        <button @click="logoutAction">退出</button>
      </div>
    </header>
    <main class="layout-main">

      <router-view></router-view>
      <!-- {{router}} -->
      <!-- ///
      {{this.$router.options.routes}} -->
    </main>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      data: []
    }
  },
  computed: {
    ...mapState({
      adminUser: state => state.adminUser.adminUser,
      router: state => state.router.router
    })
  },
  methods: {
    ...mapActions('adminUser', ['logout']),
    logoutAction () {
      this.logout()
        .then(res => {
          console.log(res)
          if (res.data.ok) {
            this.$router.push({
              path: '/login'
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss">
.admin-layout {
  .layout-nav {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 200px;
    overflow-y: auto;
    overflow-x: hidden;
    background: #304156;
    font-size: 14px;
    &::-webkit-scrollbar {
      display: none;
    }
    ul {
      // padding-left: 20px;
      > li {
        > a {
          display: flex;
          align-items: center;
          height: 50px;
          color: #bfcbd9;
          text-decoration: none;
          border-bottom: 1px solid #000;
          padding-left: 20px;
          &:hover {
            background: #1f2d3d;
            color: #00aaee;
          }
        }
        > ul {
          > li {
            > a {
              padding-left: 40px;
            }
            > ul {
              > li {
                > a {
                  padding-left: 60px;
                }
              }
            }
          }
        }
      }
    }
  }
  .layout-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    margin-left: 200px;
    padding: 0 10px;
    border-bottom: 1px solid #ccc;
    font-size: 14px;
    .header-left {
      display: flex;
      li {
        margin-right: 5px;
        &:hover {
          a {
            color: #00aaee;
          }
        }
      }
    }
    .header-right {
      flex: 0 0 200px;
      width: 200px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      img {
        height: 40px;
        width: auto;
        border-radius: 50%;
        margin: 0 10px;
        border: 1px solid #ccc;
      }
    }
  }
  .layout-main {
    margin-left: 200px;
    padding: 20px;
  }
}
// .layout-nav ul li:hover > a {
//   background: #ff0000;
// }
</style>
