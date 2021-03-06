import Login from '../views/Login.vue'
import NotFound from '../views/404.vue'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import Table from '../views/nav1/Table.vue'
import Form from '../views/nav1/Form.vue'
import user from '../views/nav1/user.vue'
import Page4 from '../views/nav2/Page4.vue'
import Page5 from '../views/nav2/Page5.vue'
import Page6 from '../views/nav3/Page6.vue'
import echarts from '../views/charts/echarts.vue'

let routes = [
  {
    path: '/login',
    component: Login,
    name: '',
    hidden: true
  },
  {
    path: '/',
    component: Home,
    name: '首页',
    leaf: true,
    iconCls: 'fa fa-home',
    children: [
      {path: '/main', component: Main, name: '首页'}
    ]
  },
  {
    path: '/404',
    component: NotFound,
    name: '',
    hidden: true
  },
  {
    path: '/',
    component: Home,
    name: '学生管理',
    iconCls: 'fa fa-user', // 图标样式class
    children: [
      { path: '/student', component: Table, name: '学生列表' },
      { path: '/form', component: Form, name: 'Form' },
      { path: '/user', component: user, name: '列表' }
    ]
  },
  {
    path: '/',
    component: Home,
    name: '导航二',
    iconCls: 'fa fa-id-card-o',
    children: [
      { path: '/page4', component: Page4, name: '页面4' },
      { path: '/page5', component: Page5, name: '页面5' }
    ]
  },
  {
    path: '/',
    component: Home,
    name: '导航三',
    iconCls: 'fa fa-address-card',
    leaf: true,
    children: [
      { path: '/page6', component: Page6, name: 'page6' }
    ]
  },
  {
    path: '/',
    component: Home,
    name: 'Charts',
    iconCls: 'fa fa-bar-chart',
    children: [
      { path: '/echarts', component: echarts, name: 'echarts' }
    ]
  },
  {
    path: '*',
    hidden: true,
    redirect: { path: '/404' }
  }
]

export default routes
