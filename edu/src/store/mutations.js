export default {
  increment (state) {
    state.count++
  },
  decrement: state => state.count--,
  // 将token保存到sessionStorage里，token表示登陆状态
  setToken: (state, data) => {
    state.token = data.token
    localStorage.setItem('token', data.token)
  },
  // 获取用户名
  getUser: (state, data) => {
    // 把用户名存起来
    state.user = data
    localStorage.setItem('user', data)
  },
  // 登出
  logout: (state) => {
    // 登出的时候要清除token
    state.token = null
    state.user = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }
}
