// pages/index/index.js

var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
  data: {
    user: {}
  },
  onLoad: function (options) {
    getOther();
  },
  onReady: function () { },
  onShow: function () { },
  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () { },
  onReachBottom: function () { },
  onShareAppMessage: function () { },

  getOther: function () {
    let _this = this;
    qcloud.request({
      url: `${config.service.host}/weapp/initData`,
      data: { 'openId': openId },
      login: false,
      success(result) {
        util.showSuccess('请求成功完成')
        console.log(result)
        return result.data.data
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    })
    // 调用登录接口
    qcloud.request({
      url: config.service.requestUrl,
      login: true,
      success(result) {
        console.log(result)
        // 信息存入本地缓存
        wx.setStorage({
          key: "openId",
          data: result.data.data.openId
        })
        wx.setStorage({
          key: "nickName",
          data: result.data.data.nickName
        })
        wx.setStorage({
          key: "avatarUrl",
          data: result.data.data.avatarUrl
        })
      },
      fail(error) {
        util.showModel('请求失败', error)
        console.log('request fail', error)
      }
    })
  },
  getRecommend: function (openId) {
    let _this = this;
    qcloud.request({
      url: `${config.service.host}/weapp/recommend`,
      data: { 'openId': openId },
      login: false,
      success(result) {
        util.showSuccess('请求成功完成')
        console.log(result)
        return result.data.data
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    })
  }
})