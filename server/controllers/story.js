
const { mysql } = require('../qcloud')
const config = require('../config')

const knex = mysql({
  client: 'mysql',
  connection: config.mysql
});

module.exports = async ctx => {
  let data = ctx.request.body;
  let openId = data.openId;
  let story = null;
  let user = ctx.state.$wxInfo.userinfo;

  if (data.handler === 'pull') {// 拉取信息
    let isNull = knex('user').select().where({ 'openId': openId });
    if (!isNull) { // 存在-查找返回
      knex('user')
        .where({ 'openId': openId })
        .update({
          nikeName: user.nikeName,
          avatarUrl: user.avatarUrl,
          update_time: Date.now()
        })

      story = knex('story').select().where({ 'openId': openId });
    } else {
      user = ctx.state.$wxInfo.userinfo;
      // let time = Math.floor(Date.now() / 1000)
      knex('user').insert({
        openId: user.openId,
        nikeName: user.nikeName,
        avatarUrl: user.avatarUrl,
        motto: '',
        create_time: Date.now() / 1000,
        update_time: Date.now() / 1000
      })
      story = [];
    }
  } else { // data.handler === 'submit'

  }

  ctx.state.data = { user, story }
}
