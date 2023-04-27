<template>
  <el-dropdown @command="handleSetLanguage" class="langSelect-container">
    <div>
      <el-tooltip :content="this.$t('navbar.i18n')" :effect="effect">
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
  padding: 0 5px;
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
