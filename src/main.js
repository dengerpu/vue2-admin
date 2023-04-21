import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.scss'
import './icons'
import ElementUI from 'element-ui' // 引入icons(全局注册SvgIcon和svg)

require('./mock/index')

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
