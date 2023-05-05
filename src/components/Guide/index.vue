<template>
  <div class="guide-container">
    <el-tooltip :content="this.$t('guide.guideTitle')">
      <svg-icon
        class="guide-icon"
        icon-class="guide2"
        @click="openGuide"
      ></svg-icon>
    </el-tooltip>
  </div>
</template>

<script>
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import steps from '@/components/Guide/steps'
import i18n from '@/lang'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Guide',
  components: {},
  props: {},
  data() {
    return {
      driver: null
    }
  },
  computed: {
    lang() {
      return this.$store.getters.language
    }
  },
  watch: {
    lang() {
      this.initDriver()
    }
  },
  mounted() {
    this.initDriver()
  },
  methods: {
    openGuide() {
      this.driver.defineSteps(steps(i18n))
      this.driver.start()
    },
    // 初始胡Driver
    initDriver() {
      this.driver = new Driver({
        // 禁止点击蒙版关闭
        allowClose: false,
        // 去掉动画可以解决图标白屏效果，但是没有动画效果了
        // animate: false,
        closeBtnText: this.$t('guide.close'),
        nextBtnText: this.$t('guide.next'),
        prevBtnText: this.$t('guide.prev'),
        doneBtnText: this.$t('guide.done')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.guide-container {
  color: #ffffff;
  padding: 0 5px;
  cursor: pointer;
  .guide-icon {
    font-size: 20px;
    font-weight: 500;
  }
}
</style>
