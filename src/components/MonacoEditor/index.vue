<template>
  <div
    ref="editorContainer"
    style="width: 100%; height: 100%; border: 1px solid #ccc"
    class="editor"
  ></div>
</template>

<script>
import * as monaco from 'monaco-editor'
import html from './vue'
export default {
  name: 'DMonacoEditor',
  components: {},
  props: {},
  data() {
    return {
      code: html,
      editor: null
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      // 初始化编辑器
      // this.editor = monaco.editor.create(this.$refs.editorContainer, {
      //   value: this.code,
      //   language: 'vue',
      //   tabSize: 2,
      //   scrollBeyondLastLine: false,
      //   automaticLayout: true, // 自动布局
      //   readOnly: false
      // })
      // 使用 - 创建 monacoEditor 对象
      this.editor = monaco.editor.create(this.$refs.editorContainer, {
        theme: 'vs-dark', // 主题
        value: this.code, // 默认显示的值
        language: 'html',
        folding: true, // 是否折叠
        foldingHighlight: true, // 折叠等高线
        foldingStrategy: 'indentation', // 折叠方式  auto | indentation
        showFoldingControls: 'always', // 是否一直显示折叠 always | mouseover
        disableLayerHinting: true, // 等宽优化
        emptySelectionClipboard: false, // 空选择剪切板
        selectionClipboard: false, // 选择剪切板
        automaticLayout: true, // 自动布局
        codeLens: false, // 代码镜头
        scrollBeyondLastLine: false, // 滚动完最后一行后再滚动一屏幕
        colorDecorators: true, // 颜色装饰器
        accessibilitySupport: 'off', // 辅助功能支持  "auto" | "off" | "on"
        lineNumbers: 'on', // 行号 取值： "on" | "off" | "relative" | "interval" | function
        lineNumbersMinChars: 5, // 行号最小字符   number
        enableSplitViewResizing: false,
        readOnly: false // 是否只读  取值 true | false
      })
      // console.log(this.editor)
      // 监听内容变化
      this.editor.onDidChangeModelContent(() => {
        // console.log(this.getCodeContext())
      })
      // 监听失去焦点事件
      this.editor.onDidBlurEditorText((e) => {
        // console.log(e)
      })
    },
    // 获取编辑框内容
    getCodeContext() {
      return this.editor.getValue()
    },
    // 自动格式化代码
    format() {
      this.editor.trigger('anything', 'editor.action.formatDocument')
      // 或者
      // this.editor.getAction(['editor.action.formatDocument']).run()
    },
    changeEditor() {
      if (this.editor === null) {
        this.init()
      }
      const oldModel = this.editor.getModel()
      const newModel = monaco.editor.createModel(this.code, 'javascript')
      if (oldModel) {
        oldModel.dispose()
      }
      this.editor.setModel(newModel)
    }
  }
}
</script>

<style lang="scss" scoped>
.editor {
  width: 100%;
  min-height: 400px;
}
</style>
