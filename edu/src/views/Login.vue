<template>
  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
      <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
    </el-form-item>
  </el-form>
</template>

<script>
import { requestLogin } from '../api/api'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      logining: false,
      ruleForm2: {
        account: 'admin',
        checkPass: 'admin'
      },
      rules2: {
        account: [
          {required: true, message: '请输入账号', trigger: 'blur'}
        ],
        checkPass: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      },
      checked: true
    }
  },
  methods: {
    ...mapMutations(['setToken']),
    handleReset2 () {
      this.$refs.ruleForm2.resetFields()
    },
    handleSubmit2 (ev) {
      var _this = this
      this.$refs.ruleForm2.validate((valid) => {
        if (valid) {
          this.logining = true
          var loginParams = { username: this.ruleForm2.account, password: this.ruleForm2.checkPass }
          requestLogin(loginParams).then(data => {
            this.logining = false
            let { msg, code, token } = data
            if (code !== 200) {
              this.$message({
                message: msg,
                type: 'error'
              })
            } else {
              _this.setToken({ token: token })
              this.$router.push({ path: '/main' })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.login-container {
  border-radius: 5px;
  margin: 180px auto;
  width: 400px;
  height: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -200px;
  margin-top: -175px;
}
.login-container .title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
.login-container .remember {
  margin: 0px 0px 35px 0px;
}
</style>
