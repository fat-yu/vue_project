// vue-router 路由配置
import Vue from 'vue'
import Router from 'vue-router'
import menus from '@/config/menu.config.js'
import Vuex from 'vuex'

Vue.use(Router, Vuex)
const routes = []

// 单独用来处理登录的router
const loginRouter = {
  path: '/login',
  name: 'Login',
  component: () => import(`@/components/login/login.vue`)
}

// 分模块设置路由，包含路由嵌套
const appRouters = {
  path: '/',
  name: 'Index',
  meta: {
    requireAuth: true // 用于判断是否需要登录
  },
  component: () => import(`@/components/Index`),
  children: []
}

// 菜单数据
menus.forEach((item) => {
  if (item.sub !== undefined) {
    item.sub.forEach((sub) => {
      appRouters.children.push({
        path: `${sub.componentName}`,
        name: sub.componentName,
        meta: {
          requireAuth: true
        },
        component: () => import(`@/components/${sub.componentName}`)
      })
    })
  } else {
    appRouters.children.push({
      path: `${item.id}`,
      name: item.id,
      meta: {
        requireAuth: true
      },
      component: () => import(`@/components/${item.id}`)
    })
  }
})

// 将各个模块的路由放到routers暴露出去
routes.push(appRouters)
routes.push(loginRouter)

console.info(routes)
const router = new Router({ routes })

// 路由导航守卫
// 注册全局钩子,用于拦截请求
router.beforeEach((to, from, next) => {
  console.info(1, to)
  let token = localStorage.getItem('token')
  if (to.path === '/login') {
    next()
  } else {
    if (token === '' || token === null) {
      next('/login')
    } else {
      next()
    }
  }
})

export default router
