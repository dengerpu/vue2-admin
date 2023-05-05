<template>
  <el-dialog
    :title="$t('universal.tip')"
    class="selectColor-container"
    :visible="dialogVisible"
    width="22%"
    @close="closeDialog"
  >
    <div class="selectColor-content">
      <p class="title">{{ $t('theme.themeColorChange') }}</p>
      <el-color-picker
        v-model="themeColor"
        show-alpha
        :predefine="predefineColors"
      ></el-color-picker>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">{{ $t('universal.cancel') }}</el-button>
      <el-button type="primary" @click="confirmDialog">{{
        $t('universal.confirm')
      }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { generateNewStyle, writeNewStyle } from '@/utils/theme'

export default {
  name: 'SelectColor',
  components: {},
  props: {
    dialogVisible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      themeColor: this.$store.getters.themeColor,
      predefineColors: [
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#c71585',
        'rgba(255, 69, 0, 0.68)',
        'rgb(255, 120, 0)',
        'hsv(51, 100, 98)',
        'hsva(120, 40, 94, 0.5)',
        'hsl(181, 100%, 37%)',
        'hsla(209, 100%, 56%, 0.73)',
        '#c7158577'
      ]
    }
  },
  methods: {
    closeDialog() {
      this.$emit('closeDialog')
    },
    async confirmDialog() {
      // 获取生成的主题色css样式表
      const newStyleText = await generateNewStyle(this.themeColor)
      // 将新的主题色写入
      writeNewStyle(newStyleText)
      // 调用vuex中的方法保存主题色
      this.$store.dispatch('theme/setThemeColor', this.themeColor)
      this.closeDialog()
    }
  }
}
</script>

<style lang="scss" scoped>
.selectColor-container {
  .selectColor-content {
    text-align: center;
  }
}
</style>
