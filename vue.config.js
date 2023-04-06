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
