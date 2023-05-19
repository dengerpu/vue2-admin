<template>
  <div class="d-markdown-container" id="markdown"></div>
</template>

<script>
import MarkdownEditor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/i18n/zh-cn'
import defaultOptions from './options'
export default {
  name: 'DMarkdown',
  components: {},
  props: {
    options: {
      type: Object,
      default() {
        return defaultOptions
      }
    },
    height: {
      type: String,
      required: false,
      default: '300px'
    },
    mode: {
      type: String,
      default: 'markdown'
    },
    htmlStr: {
      type: String,
      default: ''
    }
  },
  watch: {
    language() {
      if (!this.el) return
      const htmlStr = this.Editor.getHTML()
      this.Editor.destroy()
      this.initEditor()
      this.Editor.setHTML(htmlStr)
    }
  },
  computed: {
    language() {
      return this.$store.getters.language
    },
    editorOptions() {
      const options = Object.assign({}, defaultOptions, this.options)
      options.initialEditType = this.mode
      options.height = this.height
      return options
    }
  },
  data() {
    return {
      // Editor实例
      Editor: null,
      el: null
    }
  },
  mounted() {
    this.el = document.getElementById('markdown')
    this.initEditor()
  },
  destroyed() {
    this.destroyEditor()
  },
  methods: {
    initEditor() {
      this.Editor = new MarkdownEditor({
        el: this.el,
        ...this.editorOptions,
        language: this.$store.getters.language === 'zh' ? 'zh-CN' : 'en'
      })
      if (this.htmlStr) {
        this.Editor.setHTML(this.htmlStr)
      }
      this.Editor.on('change', () => {
        this.$emit('input', this.Editor.getHTML())
      })
      this.Editor.getMarkdown()
    },
    destroyEditor() {
      if (!this.Editor) return
      this.Editor.off('change')
      this.Editor.destroy()
    }
  }
}
</script>

<style lang="scss" scoped></style>
