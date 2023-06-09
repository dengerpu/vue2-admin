/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * 日期格式化
 * @param time 日期
 * @param Format 格式
 * @returns {string|null}
 */
export function parseTime(time, Format) {
  // 没有传时间返回null
  if (arguments.length === 0 || !time) {
    return null
  }
  // 没有传格式使用默认的格式
  const format = Format || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string') {
      // 时间戳形式
      if (/^[0-9]+$/.test(time)) {
        time = parseInt(time)
      } else {
        // 全局替换-为/
        // eslint-disable-next-line prefer-regex-literals
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeFormat = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return timeFormat
}

/**
 * 将对象中所有的Boolean值转换为0和1
 * @param obj
 * @returns {*}
 */
export function convertBooleanToNumber(obj) {
  if (typeof obj !== 'object' || obj === null) {
    // 基本类型，直接返回
    return obj
  }

  if (Array.isArray(obj)) {
    // 如果是数组，对数组中的每个元素进行递归处理
    return obj.map(convertBooleanToNumber)
  }

  // 遍历对象的属性
  for (const key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'boolean') {
        // 如果属性是布尔值，则转换为数字
        obj[key] = obj[key] ? 1 : 0
      } else {
        // 如果属性是对象，则递归处理
        obj[key] = convertBooleanToNumber(obj[key])
      }
    }
  }
  return obj
}

/***
 * 将数组转化为树形数组
 * @param data
 * @param id
 * @param pid
 */
export function convertDataToTreeData(data) {
  const map = {}
  const tree = []
  data.forEach((item) => {
    map[item.id] = { ...item }
  })
  data.forEach((item) => {
    if (item.pid && item.pid !== null) {
      const parent = map[item.pid]
      if (parent) {
        if (!parent.children) {
          parent.children = []
        }
        parent.children.push(map[item.id])
      }
    } else {
      tree.push(map[item.id])
    }
  })
  return tree
}
