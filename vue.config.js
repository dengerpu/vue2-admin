'use strict'
const path = require('path')
const defaultSettings = require('./src/settings')
// @vue/cli-service 提供的 defineConfig 帮手函数，以获得更好的类型提示
const { defineConfig } = require('@vue/cli-service')

const name = defaultSettings.title || 'vue2-admin'

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = defineConfig({
  devServer: {
    proxy: {
      '/dev-api': { // 匹配所有以/dev-api开头的请求路径
        target: 'http://localhost:8000', // 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: { '^/dev-api': '' }
      }
    }
  },
  transpileDependencies: true,
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        // src别名配置
        '@': resolve('src')
      }
    }
  }
})

// 也可以不适用defineConfig
// module.exports = {
//   // 选项..
// }
