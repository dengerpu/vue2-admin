<template>
  <el-container class="layout-container">
    <el-header :height="variables.headerHeight">{{ globalInfo.title}}</el-header>
    <el-container class="app-wrapper">
      <!--左侧菜单-->
      <el-aside :width="variables.sideBarWidth">
        <Sidebar class="sidebar-container"></Sidebar>
      </el-aside>
      <el-main class="main-container">
        <!-- 顶部的 navbar -->
        <navbar class="navbar-container"></navbar>
        <!--内容区-->
        <app-main></app-main>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import globalInfo from '@/settings.js'
import Sidebar from './components/Sidebar'
import Navbar from '@/layout/components/Navbar'
import AppMain from '@/layout/components/AppMain'
// import variables from '@/styles/variables.scss'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'layout',
  components: {
    AppMain,
    Navbar,
    Sidebar
  },
  props: {},
  data () {
    return {
      globalInfo,
      variables: {
        sideBarWidth: '210px',
        headerHeight: '60px'
      }
    }
  },
  computed: {
    // variables () {
    //   return variables
    // }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";
.layout-container {
  width: 100%;
  height: 100%;
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: calc(100% - #{$headerHeight});
    width: 100%;
  }
  .navbar-container {
    position: fixed;
    top: #{$headerHeight};
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
  }
}
</style>
