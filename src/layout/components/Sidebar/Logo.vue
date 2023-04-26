<template>
  <div class="sidebar-logo-container">
    <div v-if="isMenu" class="menu-nav" @click="toggleSideBar">
      <span class="menu-nav-title" v-if="this.$store.getters.sidebar.opened">{{ $t('sidebar.menu') }}</span>
      <div class="menu-nav-icon">
        <i :class="this.$store.getters.sidebar.opened ? 'el-icon-d-arrow-left' : 'el-icon-d-arrow-right'"></i>
      </div>
    </div>
    <div class="sidebar-logo-box" v-else>
      <img class="sidebar-logo-img" :src="globalInfo.logo" :alt="$t('globalInfo.title')">
      <h1 class="sidebar-logo-title">{{$t('globalInfo.title')}}</h1>
    </div>
  </div>
</template>

<script>
import globalInfo from '@/settings.js'
export default {
  name: 'SidebarLogo',
  components: {},
  props: {
    collapse: {
      type: Boolean,
      required: true
    },
    isMenu: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      globalInfo
    }
  },
  methods: {
    toggleSideBar () {
      this.$store.dispatch('app/toggleSidebar')
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar-logo-container {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  background: #2b2f3a;
  color: #fff;
  box-sizing: border-box;
  padding: 0 10px;
  overflow: hidden;
  .menu-nav {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    justify-content: center;
    cursor: pointer;
    overflow: hidden;
    .menu-nav-title {
      display: block;
      letter-spacing:20px;
      font-weight: 700;
    }
  }
  .sidebar-logo-box {
    display: flex;
    align-items: center;
    .sidebar-logo-img {
      width: 38px;
      height: 38px;
      display: block;
      border-radius: 50%;
    }
    .sidebar-logo-title {
      font-size: 14px;
      margin-left: 10px;
    }
  }
}
</style>
