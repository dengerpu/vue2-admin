const whiteList = ['/login', '/import', '/404', '/401']

/***
 * 判断是否要被缓存
 * @param path
 * @returns {boolean}
 */
export function isTags(path) {
  return !whiteList.includes(path)
}
