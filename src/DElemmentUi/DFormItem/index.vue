<template>
  <div class="d-form-item-container" :style="{ width: width }">
    <el-form-item :label="label" :label-width="newLabelWidth">
      <slot></slot>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: 'DFormItem',
  components: {},
  props: {
    label: {
      type: String
    },
    cols: {
      type: [String, Number],
      default: 1
    },
    labelWidth: {
      type: String
    }
  },
  computed: {
    width() {
      if (this.column <= 1 || this.column === this.cols) {
        return '100%'
      } else {
        return `calc(100% / ${this.column} * ${this.cols})`
      }
    },
    newLabelWidth() {
      if (this.labelWidth) {
        return this.labelWidth
      } else {
        return this.parentLabelWidth
      }
    }
  },
  data() {
    return {
      column: 1,
      parentLabelWidth: ''
    }
  },
  created() {
    const parent = this.$parent
    parent &&
      // eslint-disable-next-line no-prototype-builtins
      parent.$attrs.hasOwnProperty('cols') &&
      (this.column = parent.$attrs.cols)
    parent && (this.parentLabelWidth = parent.labelWidth)
  }
}
</script>

<style lang="scss" scoped>
.d-form-item-container {
  display: inline-block;
  .el-form-item {
    width: 100%;
  }
}
</style>
<style lang="scss">
.d-form-item-container {
  .el-form-item {
    .el-form-item__content {
      width: calc(100% - v-bind('newLabelWidth'));
    }
  }
}
</style>
