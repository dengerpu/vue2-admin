import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon' // svgIcon组件

// 全局注册SvgIcon组件
Vue.component('svg-icon', SvgIcon)

/***
 * require.context(directory,useSubdirectories,regExp)
 * directory:表示检索的目录
 * useSubdirectories：表示是否检索子文件夹
 * regExp:匹配文件的正则表达式,一般是文件名
 * require.context 的返回值，这个返回值是一个函数，只要传入函数名就会被 webpack 自动进行导入。
 */
const req = require.context('./svg', false, /\.svg$/)
/**
 * map函数传入我们自己定义的回调函数（callback），然后map会对数组当中每一个元素去调用回调函数。
 * @param requireContext
 * @returns {*}
 */

// const requireAll = (requireContext) => requireContext.keys().map(requireContext)

const requireAll = (requireContext) =>
  requireContext.keys().forEach(requireContext)

requireAll(req)

// 相当于引入
// import "./svg/404.svg"
// import "./svg/bug.svg"
// import "./svg/chart.svg"
// ....
