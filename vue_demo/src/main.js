// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import App from './App.vue'
import routes from './router/index.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store/index.js' // 实例化store
import axios from 'axios'
// vue-router 路由配置
import Vue from 'vue'
import Router from 'vue-router'
import Vuex from 'vuex'

axios.defaults.timeout = 6000 // axios 设置全局超时时间
axios.defaults.baseURL = 'http://localhost:3000/' // 设置baseURL后使用axios发送请求就不会是localhost:8080了

Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Router, Vuex)

//  异步请求前在header里加入token
axios.interceptors.request.use(
  config => {
    console.info(222, config)
    if (config.url !== '/user/login' || config.url !== '/user/register') { // 如果是登录和注册操作，则不需要携带header里面的token
      if (localStorage.getItem('token')) {
        config.headers.Authorizatior = localStorage.getItem('token')
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  })

// 异步请求后，判断token是否过期
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          localStorage.removeItem('token')
          this.$router.push('/')
      }
    }
  }
)

const router = new Router({
  routes: routes,
  mode: 'history'
})

// 路由导航守卫
// 注册全局钩子,用于拦截请求
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token')
  if (to.path === '/login') {
    localStorage.removeItem('token')
    next()
  } else {
    if (token === '' || token === null) {
      next('/login')
    } else {
      next()
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
