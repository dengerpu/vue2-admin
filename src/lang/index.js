import VueI18n from 'vue-i18n'
import Vue from 'vue'

import elementEnlocale from 'element-ui/lib/locale/lang/en'
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang
import enLocale from './en'
import zhLocale from './zh'

Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale,
    ...elementEnlocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale
  }
}

const locale = 'zh'

const i18n = new VueI18n({
  // 全局注入 $t 函数
  globalInjection: true,
  locale,
  messages
})

export default i18n
