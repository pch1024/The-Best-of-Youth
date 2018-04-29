//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')
var util = require('./utils/util.js')

App({
  onLaunch: function () {
    var _this = this;
    
    qcloud.setLoginUrl(config.service.loginUrl);
    // 小程序调用wx.login() 获取 临时登录凭证code(有效期五分钟) ，并回传到开发者服务器。
    // 开发者服务器以code换取 用户唯一标识openid 和 会话密钥session_key。
    // 之后开发者服务器可以根据用户标识来生成自定义登录态，用于后续业务逻辑中前后端交互时识别用户身份。 
    // 会话密钥session_key 是对用户数据进行加密签名的密钥。
    // 为了应用自身的数据安全，开发者服务器不应该把会话密钥下发到小程序，也不应该对外提供这个密钥。

    // 调用登录接口
    qcloud.login({
      success(result) {
        if (result) {
          console.log(result.data)
          saveAuth(result.data.data.nickName, result.data.data.avatarUrl)
        } else {
          // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
          qcloud.request({
            url: config.service.requestUrl,
            login: true,
            success(result) {
              console.log(result.data)
              saveAuth(result.data.data.nickName, result.data.data.avatarUrl)
            },
            fail(error) {
              util.showModel('请求失败', error)
              console.log('request fail', error)
            }
          })
        }
      },

      fail(error) {
        util.showModel('登录失败', error)
        console.log('登录失败', error)
      }
    })
  },
})

function saveAuth(name, avatar) {
  util.showSuccess('登录成功')
  setStore("nickName", name)
  setStore("avatarUrl", avatar)
  setStore("logged", true)
  setStore("time", Date.now())
}
function setStore(k, v) {
  wx.setStorage({
    key: k,
    data: v
  })
}