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
    login () {
      var name = this.userName
      var age = this.age
      this.$axios.post('/api/user/selectUser', {
        username: name,
        password: age
      }).then((response) => {
        console.log(response)
      })
    }
  }
}
</script>
