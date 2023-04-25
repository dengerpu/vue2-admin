import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.scss'
import './icons'
import ElementUI from 'element-ui' // 引入icons(全局注册SvgIcon和svg)
import i18n from '@/lang' // 国际化

import './permission'

require('./mock/index')

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
