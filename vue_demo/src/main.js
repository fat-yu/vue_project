// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store/index.js' // 实例化store
import axios from 'axios'

axios.defaults.timeout = 6000 // axios 设置全局超时时间
axios.defaults.baseURL = 'http://localhost:3000/' // 设置baseURL后使用axios发送请求就不会是localhost:8080了

Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI)

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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
