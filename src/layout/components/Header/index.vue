<template>
  <div class="header-container">
    <div class="header-left fl">
      <div class="logo">
        <span class="logo-title">{{globalInfo.title}}</span>
      </div>
    </div>
    <div class="header-right fr">
      <el-dropdown>
        <div class="avatar-container">
          <el-avatar shape="square" :size="40" src="https://blog-1300527744.cos-website.ap-chongqing.myqcloud.com/img/icon.png"></el-avatar>
          <i  class="avatar-icon el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
              <router-link to="/">
              <el-dropdown-item> 首页 </el-dropdown-item>
              </router-link>
          </el-dropdown-item>
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item divided >
            <span @click="handleLogout">退出登陆</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import globalInfo from '@/settings.js'
export default {
  name: 'DepHeader',
  components: {},
  props: {},
  data () {
    return {
      globalInfo
    }
  },
  methods: {
    // 退出登陆
    handleLogout () {
      this.$store.dispatch('LOGOUT')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";
.header-container {
  height: #{$headerHeight};
  overflow: hidden;
  position: relative;
  .header-left {
    line-height: #{$headerHeight};
    .logo {
      font-weight: 700;
      font-size: 25px;
      color: #{$headerTitleColor};
    }
  }
  .header-right {
    height: 100%;
    display: flex;
    align-items: center;
    .avatar-container {
      height: 100%;
      padding: 10px;
      margin-right: 16px;
      position: relative;
      cursor: pointer;
      .avatar-icon {
        position: absolute;
        right: -8px;
        bottom: 10px;
        color: #{$headerTitleColor};
      }
    }
    .avatar-container:hover {
      background: rgba(0, 0, 0, .025);
    }
  }
}
</style>
