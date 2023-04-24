<template>
  <div class="sidebar">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :collapse="isCollapse"
        class="el-menu-vertical-demo"
        :default-active="activeMenu"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText">
        <SidebarItem v-for="route in routes" :item="route" :key="route.path" :base-path="route.path"></SidebarItem>
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import SidebarItem from '@/layout/components/Sidebar/SidebarItem'
import { routes } from '@/mock/role/index'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Sidebar',
  components: { SidebarItem },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    // 获取当前活跃的菜单，实现菜单高亮
    activeMenu () {
      const route = this.$route
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    }
  },
  data () {
    return {
      routes,
      variables: {
        menuText: '#bfcbd9',
        menuActiveText: '#409EFF',
        subMenuActiveText: '#f4f4f5', // https://github.com/ElemeFE/element/issues/12951
        menuBg: '#304156',
        menuHover: '#263445',
        subMenuBg: '#1f2d3d',
        subMenuHover: '#001528'
      }
    }
  }
}
</script>
