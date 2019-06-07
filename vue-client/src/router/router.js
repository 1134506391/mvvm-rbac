// 默认路由
export const routes = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录'
    },
    component: () => import('@/views/login.vue')
  }
  // {
  //   path: '*',
  //   name: '404',
  //   meta: {
  //     title: '404'
  //   },
  //   component: () => import('@/views/404.vue')
  // }
]

// 动态增加的路由
export const newAddRoutes = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: '首页',
      type: 2
    },
    component: () => import('@/views/Home.vue'),
    children: [
      {
        path: '/role',
        name: 'role',
        meta: {
          title: '角色',
          type: 2
        },
        component: () => import('@/views/role/index.vue'),
        redirect: '/role/list',
        children: [
          {
            path: '/role/create',
            name: 'roleCreate',
            meta: {
              title: '创建角色',
              type: 2
            },
            component: () => import('@/views/role/create.vue')
          },
          {
            path: '/role/list',
            name: 'roleList',
            meta: {
              title: '角色列表',
              type: 2
            },
            component: () => import('@/views/role/list.vue')
          },
          {
            path: '/role/update',
            name: 'roleUpdate',
            meta: {
              title: '修改角色',
              type: 3
            },
            component: () => import('@/views/role/update.vue')
          },
          {
            path: '/role/auth',
            name: 'roleAuth',
            meta: {
              title: '角色授权',
              type: 2
            },
            component: () => import('@/views/role/auth.vue')
          }
        ]
      },
      {
        path: '/adminUser',
        name: 'adminUser',
        meta: {
          title: '管理员',
          type: 2
        },
        component: () => import('@/views/adminUser/index.vue'),
        children: [
          {
            path: '/adminUser/create',
            name: 'adminUserCreate',
            meta: {
              title: '创建管理员',
              type: 2
            },
            component: () => import('@/views/adminUser/create.vue')
          },
          {
            path: '/adminUser/list',
            name: 'adminUserList',
            meta: {
              title: '管理员列表',
              type: 2
            },
            component: () => import('@/views/adminUser/list.vue')
          },
          {
            path: '/adminUser/update',
            name: 'adminUserUpdate',
            meta: {
              title: '修改管理员',
              type: 3
            },
            component: () => import('@/views/adminUser/update.vue')
          }
        ]
      },
      {
        path: '/permission',
        name: 'permission',
        meta: {
          title: '路由权限',
          type: 2
        },
        component: () => import('@/views/permission/index.vue'),
        children: [
          {
            path: '/permission/create',
            name: 'permissionCreate',
            meta: {
              title: '创建路由权限',
              type: 2
            },
            component: () => import('@/views/permission/create.vue')
          },
          {
            path: '/permission/list',
            name: 'permissionList',
            meta: {
              title: '路由权限列表',
              type: 2
            },
            component: () => import('@/views/permission/list.vue')
          },
          {
            path: '/permission/update',
            name: 'permissionUpdate',
            meta: {
              title: '修改路由权限',
              type: 3
            },
            component: () => import('@/views/permission/update.vue')
          }
        ]
      }
    ]
  }
]

export const doFilter = (target, filter) => {
  return filter.map(e => {
    var mapped = Object.assign({}, target.find(i => i.name === e.name))
    if (e.children && mapped.children) {
      mapped.children = doFilter(mapped.children, e.children)
    }
    return mapped
  })
}
