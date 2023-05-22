<template>
  <div>
    <el-button @click="getInputInfo" type="primary">点击获取输入内容</el-button>
    <d-editor v-model="htmlStr"></d-editor>
  </div>
</template>

<script>
import DEditor from '@/components/DEditor'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Editor',
  components: { DEditor },
  props: {},
  data() {
    return {
      htmlStr: '默认内容'
    }
  },
  methods: {
    getInputInfo() {
      alert(this.htmlStr)
    }
  }
}
</script>

<style lang="scss" scoped></style>
