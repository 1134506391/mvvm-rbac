// 默认路由
export const routes = [
  // addRoutes之后还有
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录'
    },
    component: () => import('@/views/login.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      title: '注册'
    },
    component: () => import('@/views/register.vue')
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
          type: 2,
          breadCrumb: [
            {
              title: '首页',
              path: '/'
            },
            {
              title: '角色',
              path: '/role'
            }
          ]
        },
        component: () => import('@/views/role/index.vue'),
        redirect: '/role/list',
        children: [
          {
            path: '/role/create',
            name: 'roleCreate',
            meta: {
              title: '创建角色',
              type: 2,
              breadCrumb: [
                {
                  title: '首页',
                  path: '/'
                },
                {
                  title: '角色',
                  path: '/role'
                },
                {
                  title: '创建角色',
                  path: '/role/create'
                }
              ]
            },
            component: () => import('@/views/role/create.vue')
          },
          {
            path: '/role/list',
            name: 'roleList',
            meta: {
              title: '角色列表',
              type: 2,
              breadCrumb: [
                {
                  title: '首页',
                  path: '/'
                },
                {
                  title: '角色',
                  path: '/role'
                },
                {
                  title: '角色列表',
                  path: '/role/list'
                }
              ]
            },
            component: () => import('@/views/role/list.vue')
          },
          {
            path: '/role/update',
            name: 'roleUpdate',
            meta: {
              title: '修改角色',
              type: 3,
              breadCrumb: [
                {
                  title: '首页',
                  path: '/'
                },
                {
                  title: '角色',
                  path: '/role'
                },
                {
                  title: '修改角色',
                  path: '/role/update'
                }
              ]
            },
            component: () => import('@/views/role/update.vue')
          },
          {
            path: '/role/delete',
            name: 'roleDelete',
            meta: {
              title: '角色删除',
              type: 3
            }
          },
          {
            path: '/role/auth',
            name: 'roleAuth',
            meta: {
              title: '角色授权',
              type: 3,
              breadCrumb: [
                {
                  title: '首页',
                  path: '/'
                },
                {
                  title: '角色',
                  path: '/role'
                },
                {
                  title: '角色授权',
                  path: '/role/auth'
                }
              ]
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
        redirect: '/adminUser/list',
        children: [
          {
            path: '/adminUser/create',
            name: 'adminUserCreate',
            meta: {
              title: '创建管理员',
              type: 2,
              breadCrumb: [
                {
                  title: '首页',
                  path: '/'
                },
                {
                  title: '管理员',
                  path: '/adminUser'
                },
                {
                  title: '创建管理员',
                  path: '/adminUser/create'
                }
              ]
            },
            component: () => import('@/views/adminUser/create.vue')
          },
          {
            path: '/adminUser/list',
            name: 'adminUserList',
            meta: {
              title: '管理员列表',
              type: 2,
              breadCrumb: [
                {
                  title: '首页',
                  path: '/'
                },
                {
                  title: '管理员',
                  path: '/adminUser'
                },
                {
                  title: '管理员列表',
                  path: '/adminUser/list'
                }
              ]
            },
            component: () => import('@/views/adminUser/list.vue')
          },
          {
            path: '/adminUser/update',
            name: 'adminUserUpdate',
            meta: {
              title: '修改管理员',
              type: 3,
              breadCrumb: [
                {
                  title: '首页',
                  path: '/'
                },
                {
                  title: '管理员',
                  path: '/adminUser'
                },
                {
                  title: '修改管理员',
                  path: '/adminUser/update'
                }
              ]
            },
            component: () => import('@/views/adminUser/update.vue')
          },
          {
            path: '/adminUser/delete',
            name: 'adminUserDelete',
            meta: {
              title: '管理员删除',
              type: 3
            }
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
        redirect: '/permission/list',
        children: [
          {
            path: '/permission/create',
            name: 'permissionCreate',
            meta: {
              title: '创建路由权限',
              type: 2,
              breadCrumb: [
                {
                  title: '首页',
                  path: '/'
                },
                {
                  title: '路由权限',
                  path: '/permission'
                },
                {
                  title: '修改管理员',
                  path: '/permission/create'
                }
              ]
            },
            component: () => import('@/views/permission/create.vue')
          },
          {
            path: '/permission/list',
            name: 'permissionList',
            meta: {
              title: '路由权限列表',
              type: 2,
              breadCrumb: [
                {
                  title: '首页',
                  path: '/'
                },
                {
                  title: '路由权限',
                  path: '/permission'
                },
                {
                  title: '路由权限列表',
                  path: '/permission/list'
                }
              ]
            },
            component: () => import('@/views/permission/list.vue')
          },
          {
            path: '/permission/update',
            name: 'permissionUpdate',
            meta: {
              title: '修改路由权限',
              type: 3,
              breadCrumb: [
                {
                  title: '首页',
                  path: '/'
                },
                {
                  title: '路由权限',
                  path: '/permission'
                },
                {
                  title: '修改路由权限',
                  path: '/permission/update'
                }
              ]
            },
            component: () => import('@/views/permission/update.vue')
          },
          {
            path: '/permission/delete',
            name: 'permissionDelete',
            meta: {
              title: '路由权限删除',
              type: 3
            }
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
