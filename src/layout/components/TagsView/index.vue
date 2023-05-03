<template>
  <div class="tags-view-container">
    <el-scrollbar class="tags-view-wrapper">
      <router-link class="tags-view-item" :class="isActive(tag)?'active':''"
                   v-for="(tag, index) in tagsViewList" :key="index"
                   :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
                  @contextmenu.prevent.native="openContextMenu($event, index, tag)"
                   @click="this.selectIndex = index"
      >
        {{generateTitle(tag.title)}}
        <i v-if="!isFixTag(tag)" class="el-icon-close" @click.prevent.stop="closeTag(index, isActive(tag))"></i>
      </router-link>
    </el-scrollbar>
    <div class="tags-options-container">
      <el-dropdown @command="labelOptions">
        <span class="el-dropdown-link">
          {{ this.$t('tagsView.labelOption') }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
      <el-dropdown-menu class="el-dropdown-menu" slot="dropdown">
        <el-dropdown-item command="closeOthers"><span>{{this.$t('tagsView.closeOthers')}}</span></el-dropdown-item>
        <el-dropdown-item command="closeAll"><span>{{this.$t('tagsView.closeAll')}}</span></el-dropdown-item>
      </el-dropdown-menu>
      </el-dropdown>
    </div>
    <context-menu v-show="isShowContextMenu" :style="contextMenu" :index="selectIndex" :is-active="isActiveTag" :is-fix-tag="isFix"></context-menu>
  </div>
</template>

<script>
import path from 'path'
import { generateTitle } from '@/utils/i18n'
import { isTags } from '@/utils/tags'
import ContextMenu from '@/layout/components/TagsView/components/contextMenu'
import { asyncRoutes, constantRoutes } from '@/router'
import { closeTag, closeOtherTags, closeAllTags } from '@/layout/components/TagsView/components'

export default {
  name: 'TagsView',
  components: { ContextMenu },
  props: {},
  data () {
    return {
      // 是否展示ContextMenu组件
      isShowContextMenu: false,
      // 选择的tag索引
      selectIndex: 0,
      // 控制ContextMenu组件的位置
      contextMenu: {
        left: 0,
        top: 0
      },
      fixTags: [],
      isFix: false,
      isActiveTag: false
    }
  },
  computed: {
    routes () {
      return [...constantRoutes, ...asyncRoutes]
    },
    tagsViewList () {
      return this.$store.getters.tagsViewList
    }
  },
  watch: {
    // 监听路由变化
    $route (to, from) {
      this.addTags()
      this.getCurrentIndex(to.path)
    },
    // 监听isShowContextMenu值的变化，为body添加关闭事件
    isShowContextMenu (value) {
      if (value) {
        document.body.addEventListener('click', this.closeContextMenu)
      } else {
        document.body.removeEventListener('click', this.closeContextMenu)
      }
    }
  },
  mounted () {
    this.initTags()
    this.addTags()
    this.getCurrentIndex(this.$route.path)
  },
  methods: {
    generateTitle,
    closeOtherTags,
    closeAllTags,
    closeTag,
    /***
     * 添加tag
     *
     */
    addTags () {
      const { fullPath, meta, name, params, path, query } = this.$route
      if (!isTags(path)) return
      this.$store.dispatch('tagsView/add_tags', {
        fullPath,
        meta,
        name,
        params,
        path,
        query,
        title: meta.title
      })
    },
    /**
     * 判断当前路径是否处于活跃状态
     * @param tags
     * @returns {boolean}
     */
    isActive (tags) {
      return tags.path === this.$route.path
    },
    /***
     * 打开菜单
     * @param e
     * @param index
     * @param tag
     */
    openContextMenu (e, index, tag) {
      const { x, y } = e
      this.contextMenu.left = x + 'px'
      this.contextMenu.top = y + 'px'
      this.selectIndex = index
      this.isFix = this.isFixTag(tag)
      this.isActiveTag = this.isActive(tag)
      this.isShowContextMenu = true
    },
    /**
     * 关闭菜单
     */
    closeContextMenu () {
      this.isShowContextMenu = false
    },
    /**
     * 获取固定在tags-view上的标签，如果路由上设置了 affix: true这个属性，这这个标签将固定在导航栏是=上，且不被删除
     * @param routes
     * @param basePath
     */
    getAffixTags (routes, basePath = '/') {
      let tags = []
      routes.forEach(route => {
        const tagPath = path.resolve(basePath, route.path)
        if (route.meta && route.meta.affix) {
          tags.push({
            fullPath: tagPath,
            params: route.params,
            query: route.query,
            title: route.meta.title,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta }
          })
        }
        if (route.children) {
          const childrenTags = this.getAffixTags(route.children, route.path)
          if (childrenTags.length >= 1) {
            tags = [...tags, ...childrenTags]
          }
        }
      })
      return tags
    },
    /**
     * 初始化TagsView标签
     */
    initTags () {
      const fixTags = this.fixTags = this.getAffixTags(this.routes)
      for (const tag of fixTags) {
        this.$store.dispatch('tagsView/add_tags', tag)
      }
    },
    /**
     * 判断是否是固定标签
     * @param tag
     * @returns {boolean|*}
     */
    isFixTag (tag) {
      return tag.meta && tag.meta.affix
    },

    /**
     * 标签操作
     * @param command
     */
    labelOptions (command) {
      if (command === 'closeOthers') {
        this.closeOtherTags(this.selectIndex)
      } else if (command === 'closeAll') {
        this.closeAllTags(this.selectIndex)
      }
    },
    // 获取当前标签的索引
    getCurrentIndex (path) {
      const index = this.$store.getters.tagsViewList.findIndex(item => {
        return item.path === path
      })
      this.selectIndex = (index === -1 ? 0 : index)
    }
  }
}
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-wrapper {
    white-space: nowrap;
    width: calc(100% - 100px);
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .tags-options-container {
    width: 100px;
    height: 34px;
    background-color: #42b983;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    .el-dropdown-link {
      color: #fff;
      font-size: 12px;
    }
    .el-dropdown-menu span {
      font-size: 12px;
    }
  }
}
</style>
<style lang="scss">
.tags-view-container {
  .tags-view-wrapper {
    .el-scrollbar__bar {
      bottom: 0px;
    }
    .el-scrollbar__wrap {
      height: 50px;
    }
    .tags-view-item {
      .el-icon-close {
        width: 16px;
        height: 16px;
        vertical-align: 2px;
        border-radius: 50%;
        text-align: center;
        transition: all .3s cubic-bezier(.645, .045, .355, 1);
        transform-origin: 100% 50%;
        &:before {
          transform: scale(.6);
          display: inline-block;
          vertical-align: -3px;
        }
        &:hover {
          background-color: #cc5865;
          color: #fff;
        }
      }
    }
  }

}
</style>
