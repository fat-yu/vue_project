<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <form>
      <input type="text" name="username" v-model="userName"> <br>
      <input type="text" name="age" v-model="age"> <br>
      <a href="javascript:;" @click="login">提交</a>
    </form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      userName: '',
      age: ''
    }
  },
  methods: {
    ...mapMutations(['setToken']),
    login () {
      const _this = this
      const name = _this.userName
      const age = _this.age
      this.$axios.post('/api/user/login', {
        username: name,
        password: age
      }).then((response) => {
        console.info(111, response.data.token)
        _this.setToken({ token: response.data.token })
        this.$router.push('/index')
      })
    }
  }
}
</script>
