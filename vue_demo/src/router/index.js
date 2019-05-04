import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import menus from '@/config/menu.config.js'

Vue.use(Router)
const routes = []

menus.forEach((item) => {
  item.sub.forEach((sub) => {
    routes.push({
      path: `/${sub.componentName}`,
      name: sub.componentName,
      component: () => import(`@/components/${sub.componentName}`)
    })
  })
})

routes.push({
  path: '/HelloWorld',
  name: 'HelloWorld',
  component: HelloWorld
})

export default new Router({ routes })
