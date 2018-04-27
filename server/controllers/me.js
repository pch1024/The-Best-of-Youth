// 接受用户 发送的信息
// 信息包括 用户名 用户头像 用户id 用户墓志铭 用户事件
// 1 查询用户是否是新用户 是 新建 不是新的算了
// 2 覆盖更新 用户名 用户墓志铭 用户事件全删 重新生产 

const { mysql } = require('../qcloud')
const config = require('../config')

var knex = mysql({
  client: 'mysql',
  connection: config.mysql
});


module.exports = ctx => {

  let openId = '';
  let nikeName = '';
  let word = '';
  let avatar = '';


  var user = knex('user').select().where({ 'openId': openId });
  if (user){
    knex('user')
      .where({ 'openId': openId })
      .update({
        nikeName: nikeName,
        avatar: avatar,
        word: word
      })
  }else{
    knex('user').insert({
      openId: openId,
      nikeName: nikeName,
      avatar: avatar,
      word: word
    })
  }

  ctx.state.data = {
    user: "hello world"
  }
}