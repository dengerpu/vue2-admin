<template>
  <div class="login-container">
    <el-row class="login-container-header">
      <div class="login-container-header-logo"></div>
      <div class="login-container-header-title"></div>
    </el-row>
    <el-row class="login-container-center">
      <el-col :xs="0" :sm="13" :md="13" :lg="13" :xl="13">
        <!--左侧logo图-->
        <div class="login-container-center-left center">
          <img src="../../assets/images/login.png" alt="">
        </div>
      </el-col>
      <el-col :xs="24" :sm="11" :md="11" :lg="11" :xl="11">
        <!--右侧登陆窗口-->
        <div class="login-container-center-right center">
          <div class="login-box-card center">
            <div class="logo">
              <img src="../../assets/logo.png" alt="">
            </div>
            <el-form :model="userInfo" ref="loginForm" label-width="80px" size="mini" :rules="loginRules">
              <el-form-item :label="this.$t('login.username')" prop="username" class="input_label">
                <el-input v-model="userInfo.username">
                  <i slot="prefix">
                    <svg-icon icon-class="user"></svg-icon>
                  </i>
                </el-input>
              </el-form-item>
              <el-form-item :label="this.$t('login.password')" prop="password" class="input_label">
                <el-input v-model="userInfo.password" :type="passwordType">
                  <i slot="prefix">
                    <svg-icon icon-class="password"></svg-icon>
                  </i>
                  <i slot="suffix" class="password_eye">
                    <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" @click="onChangePwdType"></svg-icon>
                  </i>
                </el-input>
              </el-form-item>
              <el-form-item :label="this.$t('login.code')" prop="code" class="input_label">
                <el-input v-model="userInfo.code"></el-input>
              </el-form-item>
            </el-form>
            <el-row>
              <el-col :span="8" :offset="2"><el-button style="width: 100%" type="primary" size="mini" @click="handleLogin">
                {{ this.$t('login.logIn') }}</el-button></el-col>
              <el-col :span="8" :offset="4"><el-button style="width: 100%" type="success" size="mini">{{this.$t('login.register')}}</el-button></el-col>
            </el-row>
            <lang-select class="lang-select-container" color="#000"></lang-select>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="login-container-footer">
      <div class="login-container-footer-info">{{this.$t('login.footer1') + this.$t('globalInfo.title') + this.$t('login.footer2')}}</div>
    </el-row>
  </div>
</template>

<script>
import globalInfo from '@/settings.js'
import { Message } from 'element-ui'
import LangSelect from '@/components/LangSelect'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'login',
  components: { LangSelect },
  data () {
    return {
      globalInfo,
      passwordType: 'password',
      userInfo: {
        username: 'admin',
        password: '123456',
        code: '',
        remeberMe: true
      }
    }
  },
  computed: {
    loginRules () {
      const checkCode = (rule, value, callback) => {
        const pattern = /\d{6}/
        if (!pattern.test(value) || value.length !== 6) {
          callback(new Error(this.$t('login.codeIllegal')))
        } else {
          callback()
        }
      }
      const loginRules = {
        username: [
          { required: true, message: this.$t('login.inputUsername'), trigger: 'blur' },
          { min: 5, max: 15, message: this.$t('login.usernameLimit'), trigger: 'blur' }
        ],
        password: [
          { required: true, message: this.$t('login.inputPassword'), trigger: 'blur' },
          { min: 6, max: 18, message: this.$t('login.passwordLimit'), trigger: 'blur' }
        ],
        code: [
          { validator: checkCode, trigger: 'blur' }
        ]
      }
      return loginRules
    }
  },
  methods: {
    // 登陆事件
    handleLogin () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch('user/login', this.userInfo).then((res) => {
            this.$router.push('/')
          }).catch((err) => {
            Message.error(err)
          })
        } else {
          Message.error(this.$t('login.error'))
        }
      })
    },
    onChangePwdType () {
      if (this.passwordType === 'password') {
        this.passwordType = 'text'
      } else {
        this.passwordType = 'password'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: #96B4D4;
  overflow: hidden;
  .login-container-header {
    height: 15%;
  }
  .login-container-center {
    height: 70%;
    .login-container-center-left {
      width: 80%;
      img {
        width: 100%;
        height: 100%
      }
    }
    .login-container-center-right {
      .login-box-card {
        padding: 20px;
        //border: 1px solid #eee;
        background-color: #ffffff;
        width: 50%;
        position: relative;
        .logo {
          width: 100px;
          height: 80px;
          position: absolute;
          z-index: 999;
          left: 50%;
          background-color: #ffffff;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          box-shadow: 0 0 10px #ddd;
          padding: 10px;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        .el-form {
          margin-top: 80px;
        }
        .lang-select-container {
          position: absolute;
          top: -24px;
          right: 10px;
        }
      }
    }
  }
  .login-container-footer {
    height: 15%;
    display: flex;
    background-color: #efefef;
    justify-content: center;
    align-items: center;
    .login-container-footer-info {
      text-align: center;
      color: black;
    }
  }
}
.center {
  margin: 0 auto;
}
.password_eye {
  cursor: pointer;
}
.input_label {
  user-select: none;
}
</style>
<style lang="scss">
.login-container {
  .el-input__prefix {
    left: 10px;
  }
  .el-input__suffix {
    right: 10px;
  }
}
</style>
