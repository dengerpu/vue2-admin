<template>
  <div v-if="!item.hidden">
    <!--一级菜单-->
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item.alwaysShow
      "
    >
      <!--自定义link组件可以实现外部链接跳转和内部链接跳转-->
      <dep-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)">
          <!--这样就可以渲染菜单，为什么要写一个Item组件呢？为了实现icon可以用element-icon,也可以用外部引入的-->
          <!--<template slot="title">-->
          <!--  <i :class="onlyOneChild.meta.icon"></i>-->
          <!--  <span slot="title">{{ onlyOneChild.meta.title }}</span>-->
          <!--</template>-->
          <Item
            :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
            :title="generateTitle(onlyOneChild.meta.title)"
          ></Item>
        </el-menu-item>
      </dep-link>
    </template>
    <!--多级菜单-->
    <el-submenu v-else :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <Item
          v-if="item.meta"
          :icon="item.meta && item.meta.icon"
          :title="generateTitle(item.meta.title)"
        ></Item>
      </template>
      <!--递归调用-->
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :base-path="resolvePath(child.path)"
      ></sidebar-item>
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import { generateTitle } from '@/utils/i18n'
import depLink from './Link'
import Item from '@/layout/components/Sidebar/Item'
export default {
  name: 'SidebarItem',
  components: { Item, depLink },
  props: {
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    // 修复问题：https://github.com/PanJiaChen/vue-admin-template/issues/237
    this.onlyOneChild = null
    return {}
  },
  methods: {
    generateTitle,
    // 判断是否只有一个需要显示的路由
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter((item) => {
        if (item.hidden) {
          return false
        } else {
          this.onlyOneChild = item
          return true
        }
      })
      if (showingChildren.length === 1) {
        return true
      }
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }
      return false
    },
    // 解析path
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>

<style lang="scss" scoped></style>
