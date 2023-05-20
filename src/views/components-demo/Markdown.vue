<template>
  <div>
    <d-markdown v-model="htmlStr" @input="getInputValue"></d-markdown>
  </div>
</template>

<script>
import DMarkdown from '@/components/DMarkdown'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Markdown',
  components: { DMarkdown },
  data() {
    return {
      htmlStr: '默认内容'
    }
  },
  methods: {
    getInputValue(val) {}
  }
}
</script>

<style lang="scss" scoped></style>
