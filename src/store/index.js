import Vue from 'vue'
import Vuex from 'vuex'
import getters from 'getters'

Vue.use(Vuex)

// 获取modules下的所有文件
const modulesFiles = require.context('./modules', true, /\.js$/)

// 匹配modules下所有的文件，这样就不用一个个手动导入了
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const store = new Vuex.Store({
  modules,
  getters
})

export default store
