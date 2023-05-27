<template>
  <div class="d-icons-container">
    <el-tabs type="border-card">
      <el-tab-pane label="Icons">
        <ul class="d-icons-box">
          <li
            v-for="item in svgIcons"
            :key="item"
            @click="handelCopy(generateSvgIcon(item), $event)"
          >
            <el-tooltip placement="top">
              <div slot="content">
                {{ generateSvgIcon(item) }}
              </div>
              <div class="d-icons-item">
                <div class="d-icons-item-icon">
                  <svg-icon
                    style="pointer-events: none"
                    :icon-class="item"
                    class="d-icons-item-icon"
                  ></svg-icon>
                </div>
                <span class="d-icons-item-title">{{ item }}</span>
              </div>
            </el-tooltip>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="Element-UI Icons">
        <ul class="d-icons-box">
          <li
            v-for="item in elementIcons"
            :key="item"
            @click="handelCopy(generateElementIcon(item), $event)"
          >
            <el-tooltip placement="top">
              <div slot="content">
                {{ generateElementIcon(item) }}
              </div>
              <div class="d-icons-item">
                <div class="d-icons-item-icon">
                  <i :class="'el-icon-' + item"></i>
                </div>
                <span class="d-icons-item-title">{{ item }}</span>
              </div>
            </el-tooltip>
          </li>
        </ul>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import copy from '@/utils/clipboard'
import svgIcons from './svg-icons'
import elementIcons from './element-ui-icons'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Icons',
  components: {},
  props: {},
  data() {
    return {
      svgIcons,
      elementIcons
    }
  },
  methods: {
    generateSvgIcon(iconClass) {
      return `<svg-icon icon-class="${iconClass}"/>`
    },
    generateElementIcon(iconClass) {
      return `<i class="${iconClass}"></i>`
    },
    handelCopy(text, event) {
      console.log(text, event)
      copy(text, event)
    }
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
.d-icons-container {
  .d-icons-box {
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    border: 1px solid #eee;
    li {
      border-right: 1px solid #eee;
      border-bottom: 1px solid #eee;
      .d-icons-item {
        width: 120px;
        height: 100px;
        font-size: 32px;
        color: #606266;
        cursor: pointer;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .d-icons-item-title {
          display: block;
          width: 100%;
          padding: 5px 0;
          text-align: center;
          font-size: 16px;
        }
      }
    }
  }
}
</style>
