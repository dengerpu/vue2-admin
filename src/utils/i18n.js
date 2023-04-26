
/**
 * 侧边栏菜单，以及面包屑数据国际化
 * @param title
 * @returns {*}
 */
export function generateTitle (title) {
  // title可能包含空格，并且首字母是大写
  title = title.replace(/\s+/g, '')
  if (validUpperCase(title)) {
    title = title.toLowerCase()
  } else {
    title = title.replace(title[0], title[0].toLowerCase())
  }
  const hasKey = this.$te('route.' + title)
  if (hasKey) {
    // $t :this method from vue-i18n, inject in @/lang/index.js
    const translatedTitle = this.$t('route.' + title)
    return translatedTitle
  }
  return title
}

/**
 * 判断字符串是否为全大写字符串
 * @param str
 * @returns {boolean}
 */
function validUpperCase (str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}
