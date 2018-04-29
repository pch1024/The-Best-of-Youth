const { mysql } = require('../qcloud')
const config = require('../config')

module.exports = async (ctx, next) => {
  if (ctx.state.$wxInfo.loginState === 1) {
    // 随机获取,先得到总条数,js 产生随机数,获取该随机数ID的数据
    let select = await mysql('user').select('id')
    let random = Math.ceil(Math.random() * select.length)
    var user = await mysql('user').select('*').where({ 'id': random });

    // loginState 为 1，登录态校验成功
    ctx.state.data = {
      userinfo: ctx.state.$wxInfo.userinfo,
      date: ctx.query,
      other: user,
    }
  } else {
    ctx.state.code = -1
  }
}
