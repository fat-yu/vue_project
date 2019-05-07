import Vue from 'vue'
import Router from 'vue-router'
import menus from '@/config/menu.config.js'
import Vuex from 'vuex'

Vue.use(Router, Vuex)
const routes = []
routes.push({
  path: '/',
  name: 'Home',
  component: () => import(`@/components/Home`)
})

menus.forEach((item) => {
  if (item.sub !== undefined) {
    item.sub.forEach((sub) => {
      routes.push({
        path: `/${sub.componentName}`,
        name: sub.componentName,
        component: () => import(`@/components/${sub.componentName}`)
      })
    })
  } else {
    routes.push({
      path: `/${item.id}`,
      name: item.id,
      component: () => import(`@/components/${item.id}`)
    })
  }
})

export default new Router({ routes })
