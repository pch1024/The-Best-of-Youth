//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

App({
  onLaunch: function () {
    // 小程序调用wx.login() 获取 临时登录凭证code(有效期五分钟) ，并回传到开发者服务器。
    // 开发者服务器以code换取 用户唯一标识openid 和 会话密钥session_key。
    // 之后开发者服务器可以根据用户标识来生成自定义登录态，用于后续业务逻辑中前后端交互时识别用户身份。 
    // 会话密钥session_key 是对用户数据进行加密签名的密钥。
    // 为了应用自身的数据安全，开发者服务器不应该把会话密钥下发到小程序，也不应该对外提供这个密钥。
    wx.login({ // 获取凭证
      success: function (res) {
        if (res.code) {
          wx.request({ // 发送到私有服务器，私有服务器 使用 code 换取 openid 和 session_key。
            url: `${config.service.host}/weapp/onLogin`,
            method:'GET',
            dataType:'json',
            data: {
              code: res.code
            },
            success: function (res) {
              console.log(res)
            },
            fail: function (res) {
              console.log(res)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
  },
  globalData: {
    userInfo: null
  }
})