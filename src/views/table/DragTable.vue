<template>
  <div class="d-drag-table-container">
    <el-card>
      可拖拽表格
      <el-table :data="tableList" border ref="dragTableRef" :key="key">
        <el-table-column
          v-for="item in defaultTableList"
          :label="item.label"
          :prop="item.prop"
          :key="item.label"
        ></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import Sortable from 'sortablejs'
import { Message } from 'element-ui'
export default {
  name: 'DragTable',
  components: {},
  props: {},
  data() {
    return {
      tableList: [
        {
          id: '1',
          ranking: 1,
          title: 'ESLint + Git Hooks',
          author: 'Sunday',
          publicDate: '1629099597000',
          desc: '编码规范'
        },
        {
          id: '2',
          ranking: 2,
          title: 'Tags View',
          author: 'Sunday',
          publicDate: '1629099597000',
          desc: '便签快捷导航功能'
        },
        {
          id: '3',
          ranking: 3,
          title: 'Element-Plus',
          author: 'Sunday',
          publicDate: '1629099597000',
          desc: '基于 Vue 3.0 的桌面端组件库'
        },
        {
          id: '4',
          ranking: 4,
          title: '侧边栏',
          author: 'Sunday',
          publicDate: '1629099597000',
          desc: '根据路由动态生成的 Menu 菜单'
        },
        {
          id: '5',
          ranking: 5,
          title: '动态面包屑',
          author: 'Sunday',
          publicDate: '1629099597000',
          desc: '动态生成的面包屑数据'
        },
        {
          id: '6',
          ranking: 6,
          title: '权限验证',
          author: 'Sunday',
          publicDate: '1629099597000',
          desc: '页面权限、功能权限、动态权限、权限配置'
        },
        {
          id: '7',
          ranking: 7,
          title: 'vue-element-admin',
          author: 'Sunday',
          publicDate: '1629099597000',
          desc: '后台前端解决方案'
        },
        {
          id: '8',
          ranking: 8,
          title: 'Vue3 + 全家桶',
          author: 'Sunday',
          publicDate: '1629099597000',
          desc: '项目基于最新的vue3全家桶进行开发'
        },
        {
          id: '9',
          ranking: 9,
          title: '功能引导',
          author: 'Sunday',
          publicDate: '1629099597000',
          desc: '对用户的功能引导'
        },
        {
          id: '10',
          ranking: 10,
          title: '架构设计',
          author: 'Sunday',
          publicDate: '1629099597000',
          desc: '架构设计'
        }
      ],
      defaultTableList: [
        {
          label: '排名',
          prop: 'ranking'
        },
        {
          label: '标题',
          prop: 'title'
        },
        {
          label: '作者',
          prop: 'author'
        },
        {
          label: '描述',
          prop: 'desc'
        }
      ],
      key: 0
    }
  },
  mounted() {
    this.initSortable(this.tableList)
  },
  methods: {
    // 初始化排序
    initSortable(tableData) {
      // 获取要拖拽的元素
      const el = this.$refs.dragTableRef.$el.querySelector(
        '.el-table__body-wrapper > table > tbody'
      )
      // 参数1：el要拖拽的元素，参数2：配置对象
      Sortable.create(el, {
        // 拖拽时类名
        ghostClass: 'sortable-ghost',
        // 拖拽结束的回调方法
        onEnd(event) {
          const { newIndex, oldIndex } = event
          if (newIndex === oldIndex) {
            Message.warning('排名没有发生变化')
            return false
          }
          // // 这里应该发送请求处理排序
          // const ranking = tableData[newIndex].ranking
          // tableData[newIndex].ranking = tableData[oldIndex].ranking
          // tableData[oldIndex].ranking = ranking
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
<style lang="scss">
.d-drag-table-container {
  .sortable-ghost {
    opacity: 0.8;
    color: #fff;
    background-color: #42b983;
  }
}
</style>
