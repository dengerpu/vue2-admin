
const Mock = require('mockjs')
// const data = Mock.mock({
//   id: '@id()', // 得到随机的id,对象
//   username: '@cname()', // 随机生成中文名字
//   date: '@date()', // 随机生成日期
//   avatar: "@image('200x200','red','#fff','avatar')", // 生成图片,参数:size, background, foreground, text
//   description: '@paragraph()', // 描述
//   ip: '@ip()', // IP地址
//   email: '@email()' // email
// })

const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

Mock.mock('dev-api/login', (req, res) => {
  const item = JSON.parse(req.body)
  const username = item.username
  const password = item.password
  if (username === 'admin' && password === '123456') {
    return {
      code: '200',
      message: '登陆成功',
      data: {
        token: tokens[username]
      }
    }
  } else {
    return {
      code: '999',
      message: '账号或密码错误'
    }
  }
})
