import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon' // svgIcon组件

// 全局注册SvgIcon组件
Vue.component('svg-icon', SvgIcon)

/***
 * require.context(directory,useSubdirectories,regExp)
 * directory:表示检索的目录
 * useSubdirectories：表示是否检索子文件夹
 * regExp:匹配文件的正则表达式,一般是文件名
 */
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)

// 相当于引入
// import "./svg/404.svg"
// import "./svg/bug.svg"
// import "./svg/chart.svg"
// ....
