<template>
  <div class="d-clipboard-container">
    <div class="d-clipboard-box">
      <el-input style="width: 20%" v-model="content1"></el-input>
      <el-button type="primary" @click="handleCopy(content1)">
        点击复制
      </el-button>
    </div>
    <div class="d-clipboard-box">
      <el-input style="width: 20%" v-model="content2"></el-input>
      <el-button type="primary" @click="handleCopy2(content2)">
        点击复制
      </el-button>
    </div>
    <div class="d-clipboard-box">
      <el-input style="width: 20%" v-model="content3"></el-input>
      <el-button type="primary" @click="handleCopy3(content3, $event)">
        点击复制
      </el-button>
    </div>
    <div class="d-clipboard-box">
      <el-input style="width: 20%" v-model="content4"></el-input>
      <el-button
        type="primary"
        v-clipboard:copy="content4"
        v-clipboard:success="copySuccess"
      >
        点击复制
      </el-button>
    </div>
  </div>
</template>

<script>
import { handleCopy, handleCopy2 } from './utils'
import clip from '@/utils/clipboard'
import clipboard from '@/directive/d-clipboard'
import { Message } from 'element-ui'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Clipboard',
  directives: {
    clipboard
  },
  data() {
    return {
      content1: 'execCommand实现拷贝',
      content2: 'navigator.clipboard实现拷贝',
      content3: 'clipboard插件实现拷贝',
      content4: '自定义指令实现拷贝'
    }
  },
  methods: {
    handleCopy,
    handleCopy2,
    handleCopy3(text, event) {
      clip(text, event)
    },
    copySuccess() {
      Message.success('复制成功')
    }
  }
}
</script>

<style lang="scss" scoped>
.d-clipboard-container {
  .d-clipboard-box {
    margin: 10px 0;
  }
}
</style>
