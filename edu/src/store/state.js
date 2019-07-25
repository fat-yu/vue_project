// 初始化时用sessionStore.getItem('token'),刷新页面无需重新登录
export default {
  count: 0,
  user: localStorage.getItem('user'),
  // 使用token验证
  token: localStorage.getItem('token') ? localStorage.getItem('token') : ''
}
