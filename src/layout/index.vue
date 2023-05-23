<template>
  <el-container class="layout-container">
    <el-header :height="variables.headerHeight">
      <d-header></d-header>
    </el-header>
    <el-container class="app-wrapper">
      <!--左侧菜单-->
      <el-aside
        class="sidebar-container"
        :width="
          $store.getters.sidebar.opened
            ? variables.sideBarWidth
            : variables.hideSideBarWidth
        "
      >
        <Sidebar id="guide-sidebar"></Sidebar>
      </el-aside>
      <el-main class="main-container">
        <!-- 顶部的 navbar -->
        <navbar class="navbar-container"></navbar>
        <tags-view></tags-view>
        <!--内容区-->
        <app-main></app-main>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { Sidebar, Navbar, AppMain, DHeader, TagsView } from './components'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'layout',
  components: {
    DHeader,
    AppMain,
    Navbar,
    Sidebar,
    TagsView
  },
  data() {
    return {
      variables: {
        sideBarWidth: '210px',
        hideSideBarWidth: '50px',
        headerHeight: '50px'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.scss';
.layout-container {
  width: 100%;
  height: 100%;
  .app-wrapper {
    height: calc(100% - #{$headerHeight});
    width: 100%;
    .sidebar-container,
    .main-container {
      transition: width 0.28s;
    }
    .navbar-container {
      width: 100%;
      height: #{$navbarHeight};
      line-height: #{$navbarHeight};
      box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    }
  }
}
</style>
<style lang="scss">
@import '~@/styles/variables.scss';
.layout-container {
  .el-header {
    background: #{$headerBg};
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  }
  .el-main {
    padding: 0px;
  }
}
</style>
