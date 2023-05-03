<template>
  <div :class="{'show': isShow}" class="header-search-container">
    <svg-icon class="header-search-icon" icon-class="search" @click.stop="onShowSearchBox"></svg-icon>
    <!--
      filterable属性：开启搜索
      default-first-option属性：在输入框按下回车，选择第一个匹配项。
      remote-method属性：远程搜索方法
      -->
    <el-select ref="headerSearchRef" v-model="search" class="header-search-select" remote placeholder="Search"
               filterable default-first-option :remote-method="querySearch" @change="selectChange">
      <el-option
        v-for="option in searchOptions"
        :key="option.item.path"
        :label="option.item.title.join(' > ')"
        :value="option.item">
      </el-option>
    </el-select>
  </div>
</template>

<script>
import path from 'path'
import Fuse from 'fuse.js'
import { constantRoutes, asyncRoutes } from '@/router'
import { generateTitle } from '@/utils/i18n'
// import { generateTitle } from '@/utils/i18n'
export default {
  name: 'HeaderSearch',
  components: {},
  props: {},
  data () {
    return {
      // 控制输入框是否显示
      isShow: false,
      search: '',
      // 所有的数据
      searchData: [],
      fuse: undefined,
      // 搜索到的数据
      searchOptions: []
    }
  },
  computed: {
    routes () {
      return [...constantRoutes, ...asyncRoutes]
    },
    lang () {
      return this.$store.getters.language
    }
  },
  watch: {
    routes () {
      this.searchData = this.generateSearchData(this.routes)
    },
    lang () {
      this.searchData = this.generateSearchData(this.routes)
    },
    /***
     * 监听搜索的所有数据的变化
     * @param list
     */
    searchData (list) {
      this.initFuse(list)
    },
    /**
     * 监听isShow值的变化 （目的是为了点击空白处关闭搜索框）
     * 如果为true则说明搜索框为打开，此时要为body添加点击事件
     * 如果为false,则需要移除点击事件
     * @param value
     */
    isShow (value) {
      if (value) {
        document.body.addEventListener('click', this.closeSearchBox)
      } else {
        document.body.removeEventListener('click', this.closeSearchBox)
      }
    }
  },
  mounted () {
    this.searchData = this.generateSearchData(this.routes)
  },
  methods: {
    generateTitle,
    // 搜索事件
    querySearch (query) {
      if (query !== '') {
        this.searchOptions = this.fuse.search(query)
      } else {
        this.searchOptions = []
      }
    },
    /**
     * 查询到之后选择搜索结果进行路由跳转
     */
    selectChange (item) {
      this.$router.push(item.path)
      this.search = ''
      this.searchOptions = []
      this.$nextTick(() => {
        this.isShow = false
      })
    },
    // 显示搜索框
    onShowSearchBox () {
      this.isShow = !this.isShow
      if (this.isShow) {
        this.$refs.headerSearchRef && this.$refs.headerSearchRef.focus()
      }
    },
    // 关闭搜索框事件
    closeSearchBox () {
      this.$refs.headerSearchRef && this.$refs.headerSearchRef.blur()
      this.searchOptions = []
      this.isShow = false
    },
    // 初始化Fuse
    initFuse (list) {
      this.fuse = new Fuse(list, {
        // 是否按优先级进行排序
        shouldSort: true,
        // 匹配长度超过这个值的才会被认为是匹配的
        minMatchCharLength: 1,
        // 将被搜索的键列表。 这支持嵌套路径、加权搜索、在字符串和对象数组中搜索。
        // name：搜索的键
        // weight：对应的权重
        keys: [
          {
            name: 'title',
            weight: 0.7
          },
          {
            name: 'path',
            weight: 0.3
          }
        ]
      })
    },
    /***
     * 生成搜索数据
     * @param routes 路由表
     * @param basePath 父级路径
     * @param prefixTitle 父级标题
     * @returns {*[]}
     */
    generateSearchData (routes, basePath = '/', prefixTitle = []) {
      let result = []
      for (const item of routes) {
        if (item.hidden) { continue }
        const data = {
          path: path.resolve(basePath, item.path),
          title: [...prefixTitle]
        }
        // 动态路由不允许被搜索 (如：/path/:id)
        const reg = /.*\/:.*/
        if (item.meta && item.meta.title && !reg.exec(item.meta.path)) {
          // Error in mounted hook: "TypeError: Cannot read properties of undefined (reading '$te')"
          // const i18nTitle = generateTitle(item.meta.title)
          // data.title = [...data.title, i18nTitle]
          data.title = [...data.title, this.generateTitle(item.meta.title)]
          if (item.redirect !== 'noRedirect') {
            result.push(data)
          }
        }
        // 递归遍历子路由
        if (item.children) {
          const tempData = this.generateSearchData(item.children, data.path, data.title)
          if (tempData.length >= 1) {
            result = [...result, ...tempData]
          }
        }
      }
      return result
    }
  }
}
</script>

<style lang="scss" scoped>
.header-search-container {
  padding: 0 5px;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  .header-search-icon {
    padding: 0 5px;
    font-size: 18px;
  }
  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    ::v-deep .el-input__inner {
      height: 30px;
      line-height: 30px;
      border-radius: 0;
      border: 0;
      padding: 0px;
      background-color: transparent;
      border-bottom: 1px solid #ffffff;
      color: #ffffff;
      vertical-align: middle;
    }
  }
  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
  ::v-deep .el-range-editor.is-active, .el-range-editor.is-active:hover,
  ::v-deep .el-select .el-input.is-focus .el-input__inner {
    border-color: #ffffff;
  }
}
</style>
