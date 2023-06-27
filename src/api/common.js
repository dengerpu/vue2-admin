import Request from '@/utils/request'

/**
 * 通用接口查询
 * @param queryObject
 * @returns {*}
 */
export function query(queryObject) {
  return Request({
    url: '/api/data/public/query',
    method: 'post',
    data: queryObject
  })
}

/**
 * 通用接口保存
 * @param data
 * @returns {*}
 */
export function save(data) {
  return Request({
    url: '/api/data/public/save',
    method: 'post',
    data
  })
}
