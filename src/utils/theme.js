import formula from './formula.json'
import color from 'css-color-function'
import rgbHex from 'rgb-hex'
import axios from 'axios'

/**
 * 写入新的样式
 * @param elNewStyle
 */
export const writeNewStyle = (elNewStyle) => {
  const style = document.createElement('style')
  style.innerText = elNewStyle
  document.head.appendChild(style)
}

export const generateNewStyle = async (themeColor) => {
  // 生成的内容和formulate
  const colors = generateColors(themeColor)
  // 获取element的css样式表
  let cssText = await getOriginalStyle()

  // 遍历样式表，在css的原样式中进行全局替换
  Object.keys(colors).forEach((key) => {
    cssText = cssText.replace(
      new RegExp('(:|\\s+)' + key, 'g'),
      '$1' + colors[key]
    )
  })
  return cssText
}

/***
 * 根据选择主题色，生成主题色对应模板
 * @param themeColor
 * @returns {{colors}}
 */
export const generateColors = (themeColor) => {
  if (!themeColor) return
  const colors = {
    primary: themeColor
  }
  Object.keys(formula).forEach((key) => {
    const value = formula[key].replace(/primary/g, themeColor)
    colors[key] = '#' + rgbHex(color.convert(value))
  })
  return colors
}

/**
 * 生成替换的模板
 * @param data element的所有css
 * @returns {*}
 */
const getStyleTemplate = (data) => {
  const colorMap = {
    '#3a8ee6': 'shade-1',
    '#409eff': 'primary',
    '#53a8ff': 'light-1',
    '#66b1ff': 'light-2',
    '#79bbff': 'light-3',
    '#8cc5ff': 'light-4',
    '#a0cfff': 'light-5',
    '#b3d8ff': 'light-6',
    '#c6e2ff': 'light-7',
    '#d9ecff': 'light-8',
    '#ecf5ff': 'light-9'
  }
  // 根据默认色值为要替换的色值打上标记
  // 例如从element官网获取到的css文件中某个属性为  button { color: '#409eff', background-color: '#53a8ff' },
  // 经过替换之后全部变为 button { color: 'primary',background-color: 'light-1' }
  Object.keys(colorMap).forEach((key) => {
    const value = colorMap[key]
    data = data.replace(new RegExp(key, 'ig'), value)
  })
  return data
}

/***
 * 获取element的css
 * @returns {Promise<*>}
 */
const getOriginalStyle = async () => {
  // 获取element的版本
  const version = require('element-ui/package.json').version
  // 获取当前项目中element对应版本的css
  const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`
  const { data } = await axios(url)
  // 把获取到的数据转换为原样式模板(这里不需要替换@font-face)
  return getStyleTemplate(data.replace(/@font-face{[^}]+}/, ''))
}
