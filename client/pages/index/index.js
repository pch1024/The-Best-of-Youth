// pages/index/index.js

var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')

Page({
  data: {
    user: {}
  },
  onLoad: function (options) {},
  onReady: function () { 
    this.getOther();
  },
  onShow: function () { },
  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () { },
  onReachBottom: function () { },
  onShareAppMessage: function () { },

  getOther: function () {
    let _this = this;
    let openId = 'some';
    qcloud.request({
      url: `${config.service.host}/weapp/getOther`,
      data: { 'openId': openId },
      login: false,
      success(result) {
        console.log(result)
      },
      fail(error) {
        console.log('request fail', error);
      }
    })
  },
})