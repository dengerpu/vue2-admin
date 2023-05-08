/***
 * 导入对应关系表
 * @type {{姓名: string, 角色: string, 开通时间: string, 联系方式: string}}
 */
export const USER_RELATIONS = {
  姓名: 'username',
  联系方式: 'mobile',
  角色: 'role',
  开通时间: 'openTime'
}

/***
 * 将数组转化为二维数组
 * @param headers 转换规则
 * @param data table表格中的数据或者从数据库查询到的数据
 * @returns {*}
 */
export function formatJson(headers, data) {
  return data.map((item) => {
    return Object.keys(headers).map((key) => {
      if (headers[key] === 'role') {
        const roles = item[headers[key]]
        return JSON.stringify(roles.map((role) => role.title))
      }
      return item[headers[key]]
    })
  })
}
