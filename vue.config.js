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
  // 全局 sass的配置
  // chainWebpack (config) {
  //   globalSass(config)
  // }
  // pluginOptions: {
  //   'style-resources-loader': {
  //     preProcessor: 'scss',
  //     patterns: [
  //       path.resolve('src/styles/variables.scss')
  //     ]
  //   }
  // }
})

/**
 * 注意Dependencies需要引入
 * "sass": "^1.32.7",
 *"sass-loader": "^12.0.0",
 *"sass-resources-loader": "^2.2.5"
 * 全局变量的Sass引方法，值得收藏
 * @param config  chainWebpack(config) 中来的一个配置
 */
const globalSass = config => {
  const oneOfsMap = config.module.rule('scss').oneOfs.store
  oneOfsMap.forEach((item) => {
    item
      .use('sass-resources-loader')
      .loader('sass-resources-loader')
      .options({
        resources: './src/styles/variables.scss'
      })
      .end()
  })
}

// 也可以不使用defineConfig
// module.exports = {
//   // 选项..
// }
