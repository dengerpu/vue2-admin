/**
 * @param {string} path
 * @returns {Boolean}
 * 判断是否是外部链接地址
 */
export function isExternal (path) {
  // 判断是否是以http:,https:,mailto:,tel:为开头
  return /^(https?:|mailto:|tel:)/.test(path)
}
