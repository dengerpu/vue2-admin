<template>
  <div class="login-container">
    <el-row class="login-container-header">
      <div class="login-container-header-logo"></div>
      <div class="login-container-header-title">{{global.title}}</div>
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
            <el-form :model="userInfo" label-width="60px" size="mini">
              <el-form-item label="用户名">
                <el-input v-model="userInfo.username" prefix-icon="el-icon-user-solid"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input v-model="userInfo.password" prefix-icon="el-icon-search"></el-input>
              </el-form-item>
              <el-form-item label="验证码">
                <el-input v-model="userInfo.code"></el-input>
              </el-form-item>
            </el-form>
            <el-row>
              <el-col :span="8" :offset="2"><el-button style="width: 100%" type="primary" size="mini" @click="handleLogin">登陆</el-button></el-col>
              <el-col :span="8" :offset="4"><el-button style="width: 100%" type="success" size="mini">注册</el-button></el-col>
            </el-row>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="login-container-footer">
      <div class="login-container-footer-info">本网站由{{global.title}}提供技术支持</div>
    </el-row>
  </div>
</template>

<script>
import global from '../../settings.js'
import { Message } from 'element-ui'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'login',
  components: {},
  props: {},
  data () {
    return {
      global,
      userInfo: {
        username: 'admin',
        password: '123456',
        code: '',
        remeberMe: true
      }
    }
  },
  methods: {
    // 登陆事件
    handleLogin () {
      this.$store.dispatch('Login', this.userInfo).then((res) => {
        console.log(res)
      }).catch((err) => {
        Message.error(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100%;
  background-color: #96B4D4;
  overflow: hidden;
  .login-container-header {
    height: 20%;
  }
  .login-container-center {
    height: 65%;
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
        background-color: #4389BC;
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
</style>
