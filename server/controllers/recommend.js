// const { mysql } = require('../qcloud')
// var data = mysql('db_name').select().from('user')
module.exports = (ctx, next)=> {
  let str = ctx.originalUrl
  let openId = str.slice(str.indexOf("=") + 1, str.lengt);

  ctx.state.data = ctx.request.body
}
