/***
 * require.context(directory,useSubdirectories,regExp)
 * directory:表示检索的目录
 * useSubdirectories：表示是否检索子文件夹
 * regExp:匹配文件的正则表达式,一般是文件名
 */
const req = require.context('../../icons/svg', false, /\.svg$/)
const requireAll = (requireContext) => requireContext.keys()

const regExp = /\.\/(.*)\.svg/

// requireAll(req) 得到的是['./404.svg', './bug.svg', './change-theme.svg']
// 我们预期想要的 ['404', 'bug', 'change-theme']

const svgIcons = requireAll(req).map((item) => {
  return item.match(regExp)[1]
})

export default svgIcons
