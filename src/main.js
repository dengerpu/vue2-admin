import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.scss'
import './icons' // 引入icons(全局注册SvgIcon和svg)

import ElementUI from 'element-ui'

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
