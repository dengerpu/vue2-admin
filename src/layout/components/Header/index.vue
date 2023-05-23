<template>
  <div class="header-container">
    <div class="header-left fl">
      <div class="logo">
        <img
          class="logo-img"
          :src="globalInfo.logo"
          :alt="$t('globalInfo.title')"
        />
        <h1 class="logo-title">{{ $t('globalInfo.title') }}</h1>
      </div>
    </div>
    <div class="header-right fr">
      <!--引导-->
      <guide id="guide-start"></guide>
      <!--搜索-->
      <header-search id="guide-search"></header-search>
      <!--全屏-->
      <screenfull id="guide-full"></screenfull>
      <!--主题更换-->
      <theme-picker id="guide-theme"></theme-picker>
      <!--国际化-->
      <lang-select id="guide-lang"></lang-select>
      <!--头像-->
      <el-dropdown>
        <div class="avatar-container">
          <el-avatar
            shape="square"
            :size="40"
            src="https://blog-1300527744.cos-website.ap-chongqing.myqcloud.com/img/icon.png"
          ></el-avatar>
          <i class="avatar-icon el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item> {{ $t('navbar.dashboard') }} </el-dropdown-item>
          </router-link>
          <router-link to="/profile/index">
            <el-dropdown-item>{{ $t('navbar.profile') }}</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span @click="handleLogout">{{ $t('navbar.logOut') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import globalInfo from '@/settings.js'
import LangSelect from '@/components/LangSelect'
import ThemePicker from '@/components/ThemePicker'
import Screenfull from '@/components/Screenfull'
import HeaderSearch from '@/components/HeaderSearch'
import Guide from '@/components/Guide'
export default {
  name: 'DHeader',
  components: { Guide, HeaderSearch, Screenfull, ThemePicker, LangSelect },
  props: {},
  data() {
    return {
      globalInfo
    }
  },
  methods: {
    // 退出登陆
    handleLogout() {
      this.$store.dispatch('user/logout')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.scss';
.header-container {
  height: #{$headerHeight};
  overflow: hidden;
  position: relative;
  .header-left {
    line-height: #{$headerHeight};
    .logo {
      display: flex;
      align-items: center;
      color: #{$headerTitleColor};
      .logo-img {
        display: inline-block;
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
      .logo-title {
        margin-left: 18px;
      }
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
      background: rgba(0, 0, 0, 0.025);
    }
  }
}
</style>
