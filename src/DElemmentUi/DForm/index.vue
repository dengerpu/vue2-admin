<template>
  <el-form
    :model="model"
    :label-width="labelWidth"
    :inline="inline"
    :cols="cols"
  >
    <slot></slot>
  </el-form>
</template>

<script>
export default {
  name: 'DForm',
  components: {},
  props: {
    model: {
      type: Object,
      required: true
    },
    labelWidth: {
      type: String,
      default: '80px'
    },
    inline: {
      type: Boolean,
      default: false
    },
    cols: {
      type: [String, Number],
      default: 1
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped></style>
