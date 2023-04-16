<template>
  <el-container>
    <el-header>{{ globalInfo.title}}</el-header>
    <el-container>
      <el-aside :width="variables.sideBarWidth">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :background-color="variables.menuBg"
          :text-color="variables.menuText"
          :active-text-color="variables.menuActiveText">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-setting"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
import globalInfo from '@/settings.js'
// import variables from '@/styles/variables.scss'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'layout',
  components: {},
  props: {},
  data () {
    return {
      globalInfo,
      variables: {
        sideBarWidth: '210px',
        menuText: '#bfcbd9',
        menuActiveText: '#409EFF',
        subMenuActiveText: '#f4f4f5', // https://github.com/ElemeFE/element/issues/12951
        menuBg: '#304156',
        menuHover: '#263445',
        subMenuBg: '#1f2d3d',
        subMenuHover: '#001528'
      }
    }
  },
  computed: {
    // variables () {
    //   return variables
    // }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-container,.el-aside {
  height: 100%;
}
.el-aside {
  background-color: #304156;
}
</style>
