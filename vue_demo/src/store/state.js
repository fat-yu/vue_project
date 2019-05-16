// 初始化时用sessionStore.getItem('token'),刷新页面无需重新登录
export default {
  count: 0,
  user: window.sessionStorage.getItem('user'),
  token: window.sessionStorage.getItem('token')
}
