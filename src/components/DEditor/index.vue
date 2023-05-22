<template>
  <div class="d-editor-container">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editor"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      :style="{ height: height, overflowY: 'hidden' }"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="onCreated"
      @onChange="onChange"
    />
  </div>
</template>

<script>
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { i18nChangeLanguage } from '@wangeditor/editor'

export default {
  name: 'DEditor',
  components: { Editor, Toolbar },
  model: {
    prop: 'htmlStr',
    event: 'input'
  },
  props: {
    htmlStr: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: '500px'
    },
    mode: {
      type: String,
      default: 'default' // or 'simple'
    }
  },
  watch: {
    language(newValue) {
      // 遗憾的是，wangEditor5并不支持动态奇热换语言
      // https://github.com/wangeditor-team/wangEditor/issues/4741
    }
  },
  computed: {
    language() {
      return this.$store.getters.language
    }
  },
  data() {
    return {
      editor: null,
      toolbarConfig: {},
      editorConfig: { placeholder: '请输入内容...' }
    }
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
      i18nChangeLanguage(this.language === 'zh' ? 'zh-CN' : 'en')
      this.editor.setHtml(this.htmlStr)
    },
    onChange(editor) {
      this.$emit('input', editor.getHtml())
    }
  },
  beforeDestroy() {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  }
}
</script>

<style src="@wangeditor/editor/dist/css/style.css"></style>
<style lang="scss" scoped>
.d-editor-container {
  border: 1px solid #ccc;
}
</style>
