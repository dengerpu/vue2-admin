<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in breadcrumbData" :key="item.path">
        <!--不可点击跳转-->
        <span v-if="item.redirect==='noRedirect'||index==breadcrumbData.length-1" class="no-redirect">{{ item.meta.title }}</span>
        <!--可点击跳转-->
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import pathToRegexp from 'vue-router'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Breadcrumb',
  components: {},
  props: {},
  data () {
    return {
      breadcrumbData: null
    }
  },
  watch: {
    $route (route) {
      if (route.path.startsWith('/redirect/')) {
        return
      }
      this.getBreadcrumbData()
    }
  },
  created () {
    this.getBreadcrumbData()
  },
  methods: {
    // 获取面包屑数据
    getBreadcrumbData () {
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
      const first = matched[0]
      // 如果第一个不是首页，就要把首页加进去
      if (!this.isDashboard(first)) {
        matched = [{ path: '/dashboard', meta: { title: 'Dashboard' } }].concat(matched)
      }
      this.breadcrumbData = matched
    },
    /***
     * 判断是否是都是首页
     * @param route
     */
    isDashboard (route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
    },
    pathCompile (path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    handleLink (item) {
      const { redirect, path } = item
      // 避免在当前路由还重复点击报错问题
      if (this.$route.path !== redirect && this.$route.path !== path) {
        if (redirect) {
          this.$router.push(redirect)
          return
        }
        this.$router.push(this.pathCompile(path))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/transition.scss";
.breadcrumb {
  display: inline-block;
  font-size: 12px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
