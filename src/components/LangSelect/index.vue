<template>
  <el-dropdown @command="handleSetLanguage" class="langSelect-container">
    <div>
      <el-tooltip content="国际化">
        <svg-icon class="langSelect-icon" icon-class="language" />
      </el-tooltip>
    </div>
    <el-dropdown-menu slot="dropdown" class="langSelect-menu">
      <el-dropdown-item :disabled="language === 'zh'" command="zh">中文</el-dropdown-item>
      <el-dropdown-item :disabled="language === 'en'" command="en">english</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { Message } from 'element-ui'

export default {
  name: 'LangSelect',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {
    language () {
      return this.$store.getters.language
    }
  },
  methods: {
    handleSetLanguage (lang) {
      this.$i18n.locale = lang
      this.$store.dispatch('app/setLanguage', lang)
      Message.success(this.$t('toast.switchLangSuccess'))
    }
  }
}
</script>

<style lang="scss" scoped>
.langSelect-container {
  cursor: pointer;
  .langSelect-icon {
    color: #fff;
    font-size: 20px;
  }
  .langSelect-menu {
    cursor: pointer;
  }
}
</style>
