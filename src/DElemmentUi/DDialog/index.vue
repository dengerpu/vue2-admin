<template>
  <div class="d-dialog-container">
    <el-dialog
      :title="title"
      :visible="visible"
      width="width"
      @close="closeEvent"
      v-drag
    >
      <slot></slot>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          icon="el-icon-success"
          size="mini"
          @click="saveEvent"
        >
          确 定
        </el-button>
        <el-button size="mini" icon="el-icon-error" @click="closeEvent">
          取 消
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import drag from '@/directive/d-dialog-drag'
export default {
  name: 'DDialog',
  directives: {
    drag
  },
  props: {
    title: {
      type: String,
      default: '提示'
    },
    visible: {
      type: Boolean,
      default: false
    },
    saveEvent: {
      type: Function
    },
    closeEvent: {
      type: Function
    },
    width: {
      type: String,
      default: '30%'
    }
  },
  data() {
    return {
      dialogVisible: true
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped></style>
<style lang="scss">
.d-dialog-container {
  .el-dialog__header {
    background-color: #e6e6e6;
    padding: 10px;
  }
  .el-dialog__headerbtn {
    top: 14px;
    right: 14px;
  }
  .el-dialog__title {
    font-size: 18px;
  }
  .el-dialog__footer {
    padding: 5px 10px;
    border-top: 1px solid rgba(0, 21, 41, 0.08);
  }
}
</style>
