<template>
  <div class="d-menu-manager-container">
    <el-button @click="dialogVisible = true">点击打开</el-button>
    <d-dialog
      v-model="dialogVisible"
      :close-event="closeDialog"
      title="新增菜单"
      width="50%"
      :save-event="saveDialog"
      :data-source="{
        type: 'add',
        table: { name: 'sys_menu', data: menuForm }
      }"
    >
      <d-form :model="menuForm" label-width="100px" inline :cols="2">
        <d-form-item label="菜单类型">
          <el-radio-group
            size="mini"
            v-model="menuForm.menu_type"
            style="margin-bottom: 30px"
          >
            <el-radio-button label="dir">目录</el-radio-button>
            <el-radio-button label="menu">菜单</el-radio-button>
            <el-radio-button label="button">按钮</el-radio-button>
          </el-radio-group>
        </d-form-item>
        <d-form-item label="菜单隐藏">
          <el-switch v-model="menuForm.hidden"> </el-switch>
        </d-form-item>
        <d-form-item label="菜单图标">
          <el-popover
            ref="popover"
            placement="bottom"
            width="400"
            trigger="click"
            @show="$refs['iconSelect'].reset()"
          >
            <d-icon-select
              ref="iconSelect"
              @selected="selectedIcon"
            ></d-icon-select>
          </el-popover>
          <el-input
            placeholder="点击选择图标"
            size="mini"
            readonly
            v-model="menuForm.icon"
            clearable
            v-popover:popover
          >
            <IconItem
              v-if="menuForm.icon"
              :icon="menuForm.icon"
              slot="prefix"
            ></IconItem>
            <i v-else slot="prefix" class="el-icon-search el-input__icon" />
          </el-input>
        </d-form-item>
        <d-form-item label="外链菜单">
          <el-switch v-model="menuForm.i_frame"> </el-switch>
        </d-form-item>
        <d-form-item label="上级菜单">
          <d-select
            :data-source="{
              table: {
                name: 'sys_menu',
                fields: 'id, id value, title label,pid'
              }
            }"
            is-tree
            v-model="menuForm.pid"
          ></d-select>
        </d-form-item>
        <d-form-item label="菜单名称">
          <el-input size="mini" v-model="menuForm.title"></el-input>
        </d-form-item>
        <d-form-item label="菜单路径">
          <el-input
            size="mini"
            v-model="menuForm.path"
            placeholder="例如: /dashboard/index"
          ></el-input>
        </d-form-item>
        <d-form-item label="菜单页面">
          <el-input
            size="mini"
            v-model="menuForm.name"
            placeholder="例如: views/dashboard/index"
          ></el-input>
        </d-form-item>
        <d-form-item label="菜单排序">
          <el-input-number
            v-model="menuForm.menu_sort"
            :min="0"
            :max="100"
            label="排序"
            size="mini"
          ></el-input-number>
        </d-form-item>
      </d-form>
    </d-dialog>
  </div>
</template>

<script>
import DDialog from '@/DElemmentUi/DDialog'
import DForm from '@/DElemmentUi/DForm'
import DFormItem from '@/DElemmentUi/DFormItem'
import DIconSelect from '@/DElemmentUi/DIconSelect'
import IconItem from '@/components/IconItem'
import DSelect from '@/DElemmentUi/DSelect'
export default {
  name: 'DMenuManager',
  components: { IconItem, DIconSelect, DFormItem, DForm, DDialog, DSelect },
  props: {},
  data() {
    return {
      dialogVisible: false,
      menuForm: {
        menu_type: 'dir',
        hidden: 0,
        icon: '',
        i_frame: 0,
        menu_sort: 0,
        pid: ''
      },
      select: ''
      // options: [
      //   {
      //     id: 118,
      //     label: '测试111',
      //     value: 118,
      //     children: [
      //       {
      //         pid: 118,
      //         id: 119,
      //         label: '测试2222',
      //         value: 119,
      //         children: [
      //           {
      //             pid: 119,
      //             id: 120,
      //             label: '首页',
      //             value: 120
      //           }
      //         ]
      //       },
      //       {
      //         pid: 118,
      //         id: 121,
      //         label: '文档',
      //         value: 121
      //       }
      //     ]
      //   }
      // ]
    }
  },
  methods: {
    closeDialog() {
      this.menuForm = {
        menu_type: 'dir',
        hidden: 0,
        icon: '',
        i_frame: 0,
        menu_sort: 0,
        pid: ''
      }
      this.dialogVisible = false
    },
    saveDialog() {
      console.log(this.menuForm)
      // this.dialogVisible = false
    },
    selectedIcon(icon) {
      this.menuForm.icon = icon
    },
    queryMethod() {
      console.log('自定义方法执行')
    }
  }
}
</script>

<style lang="scss" scoped>
.d-menu-manager-container {
  .el-radio-group {
    margin-bottom: 0px;
  }
}
</style>
<style lang="scss">
.d-menu-manager-container {
  .el-radio-group {
    margin-bottom: 0px !important;
  }
  .icon-class {
    width: 14px;
    height: 14px;
    padding-left: 2px;
    padding-top: 2px;
  }
}
</style>
