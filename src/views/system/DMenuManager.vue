<template>
  <div class="d-menu-manager-container">
    <el-button @click="dialogVisible = true">点击打开</el-button>
    <d-dialog
      :visible="dialogVisible"
      :close-event="closeDialog"
      :save-event="saveDialog"
      title="新增菜单"
      width="50%"
    >
      <d-form :model="menuForm" label-width="100px" inline :cols="2">
        <d-form-item label="菜单类型">
          <el-radio-group
            size="mini"
            v-model="menuForm.type"
            style="margin-bottom: 30px"
          >
            <el-radio-button label="dir">目录</el-radio-button>
            <el-radio-button label="menu">菜单</el-radio-button>
            <el-radio-button label="button">按钮</el-radio-button>
          </el-radio-group>
        </d-form-item>
        <d-form-item label="菜单显示">
          <el-switch v-model="menuForm.show"> </el-switch>
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
          <el-switch v-model="menuForm.externalLink"> </el-switch>
        </d-form-item>
        <d-form-item label="上级菜单">
          <el-input size="mini"></el-input>
        </d-form-item>
        <d-form-item label="菜单名称">
          <el-input size="mini"></el-input>
        </d-form-item>
        <d-form-item label="菜单路径">
          <el-input size="mini"></el-input>
        </d-form-item>
        <d-form-item label="菜单排序">
          <el-input-number
            v-model="menuForm.order"
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
export default {
  name: 'DMenuManager',
  components: { IconItem, DIconSelect, DFormItem, DForm, DDialog },
  props: {},
  data() {
    return {
      dialogVisible: false,
      menuForm: {
        type: 'dir',
        show: true,
        icon: '',
        externalLink: false,
        order: 0
      }
    }
  },
  methods: {
    closeDialog() {
      this.dialogVisible = false
    },
    saveDialog() {
      console.log(this.menuForm)
      // this.dialogVisible = false
    },
    selectedIcon(icon) {
      console.log(icon)
      this.menuForm.icon = icon
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
