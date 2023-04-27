<template>
  <el-dropdown class="themeSelect-container">
    <div>
      <el-tooltip :content="this.$t('theme.change')" :effect="effect">
        <svg-icon class="themeSelect-icon" icon-class="theme-change"></svg-icon>
      </el-tooltip>
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item >
        <span @click="showDialogFun">{{ $t('theme.themeColorChange') }}</span>
      </el-dropdown-item>
    </el-dropdown-menu>
    <select-color :dialog-visible="showDialog" @closeDialog='closeDialog'></select-color>
  </el-dropdown>
</template>

<script>
import SelectColor from '@/components/ThemePicker/components/SelectColor'
export default {
  name: 'ThemePicker',
  components: { SelectColor },
  props: {
    effect: {
      type: String,
      default: 'dark',
      validator: function (value) {
        return ['dark', 'light'].indexOf(value) !== -1
      }
    }
  },
  data () {
    return {
      showDialog: false
    }
  },
  methods: {
    closeDialog () {
      this.showDialog = false
    },
    showDialogFun () {
      this.showDialog = true
    }
  }
}
</script>

<style lang="scss" scoped>
.themeSelect-container {
  padding: 0 5px;
  cursor: pointer;
  .themeSelect-icon {
    color: #fff;
    font-size: 26px;
  }
}
</style>
