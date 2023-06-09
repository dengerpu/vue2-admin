import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.scss'
import './icons'
import ElementUI from 'element-ui' // 引入icons(全局注册SvgIcon和svg)
import i18n from '@/lang' // 国际化
import * as filters from './filters' // 过滤器

import './permission'

require('./mock/index')

// 全局注册过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.use(ElementUI, {
  size: 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
