<template>
  <div class="screenFull-container">
    <svg-icon
      :icon-class="isFullScreen ? 'exit-fullscreen' : 'fullscreen'"
      @click="toggleScreen"
    ></svg-icon>
  </div>
</template>

<script>
// https://github.com/sindresorhus/screenfull
import screenfull from 'screenfull'
import { Message } from 'element-ui'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Screenfull',
  data() {
    return {
      // 是否全屏
      isFullScreen: false
    }
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    if (screenfull.isEnabled) {
      screenfull.off('change', this.change)
    }
  },
  methods: {
    toggleScreen() {
      // 不支持全屏，提示‘你的浏览器不支持’
      if (!screenfull.isEnabled) {
        Message.error(this.$t('universal.notWork'))
        return false
      }
      screenfull.toggle()
    },
    change() {
      this.isFullScreen = screenfull.isFullscreen
    },
    init() {
      if (screenfull.isEnabled) {
        screenfull.on('change', this.change)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.screenFull-container {
  padding: 0 5px;
  color: #ffffff;
  cursor: pointer;
}
</style>
