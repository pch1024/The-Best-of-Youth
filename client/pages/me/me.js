// pages/me/me.js
const date = new Date()
const now = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;

const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config')
const util = require('../../utils/util.js')

function extendDeep(parent, child) {
  var toStr = Object.prototype.toString,
    astr = "[object Array]",
    child = child || {};
  for (var i in parent) {
    if (parent.hasOwnProperty(i)) {
      if (typeof parent[i] === "object") {
        child[i] = toStr.call(parent[i]) === astr ? [] : {};
        extendDeep(parent[i], child[i]);
      } else {
        child[i] = parent[i];
      }
    }
  }
  return child;
}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isEdit: false,  // 编辑状态
    date: now,      // 时间限制和默认时间
    openId: '',
    nickName: "",
    avatarUrl: "",
    word: '',        // 座右铭
    story: [],       // 人生故事
    cacheStory: ''    // 人生故事暂存
  },
  addEvent: function (e) {
    let tmp_story = this.data.story.slice();
    tmp_story.push({
      status: true,
      date: date.getFullYear(),
      text: "",
    })
    this.setData({
      story: tmp_story
    });
  },
  // 缓存 text
  bindTextAreaBlur: function (e) {
    let tmp_story = this.data.story;
    let index = e.currentTarget.dataset.current;
    tmp_story[index].text = e.detail.value;

    this.setData({
      story: tmp_story
    });
  },
  // 开始编辑
  doEdit: function (e) {
    let tmp_story = extendDeep(this.data.story);
    this.setData({
      isEdit: true,
      cacheStory: tmp_story
    });
  },
  // 取消编辑
  unEdit: function (e) {
    let tmp_cacheStory = this.data.cacheStory;
    this.setData({
      isEdit: false,
      story: tmp_cacheStory,
    });
    console.log(tmp_cacheStory)
  },
  // 表单提交
  formSubmit: function (e) {
    let formDatas = e.detail.value;
    let counter = 0;
    for (let key in formDatas) {
      if ((/^event-status/i).test(key)) {
        counter++
      }
    }
    let tmp_story = [];
    for (var i = 0; i < counter; i++) {
      tmp_story.push({
        status: formDatas['event-status-' + i],
        date: formDatas['event-date-' + i].substr(0, 4),
        text: formDatas['event-text-' + i],
      })
    }

    this.setData({
      story: tmp_story,
      word: formDatas.word,
      isEdit: false
    });
    // 发送数据到后台
    let _this = this;
    qcloud.request({
      url: `${config.service.host}/weapp/story`,
      data: {
        'method': "update",
        'openId': _this.data.openId,
        'nickName': _this.data.nickName,
        'avatarUrl': _this.data.avatarUrl,
        'story': _this.data.story,
      },
      login: false,
      success(result) {
        util.showSuccess('请求成功完成')
        console.log(result)
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    })

  },
  // 日期修改
  bindDateChange: function (e) {

    let tmp_story = this.data.story;
    let index = e.currentTarget.dataset.current;
    let value = e.detail.value.substr(0, 4);
    tmp_story[index].date = value;

    this.setData({
      story: tmp_story
    });

    console.log(e.currentTarget.dataset.current)
    console.log(e.detail.value)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let _this = this;

    // util.showSuccess('请求中···')
    // qcloud.request({
    //   url: `${config.service.host}/weapp/story`,
    //   method:'post',
    //   header: { 'content-type': 'application/x-www-form-urlencoded' },
    //   data: {
    //     'handler': "pull",
    //     'openId': _this.data.openId,
    //   },
    //   login: false,
    //   success(result) {
    //     util.showSuccess('请求成功完成')
    //     console.log(result)
    //   },
    //   fail(error) {
    //     util.showModel('请求失败', error);
    //     console.log('request fail', error);
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    wx.getStorage({
      key: 'openId',
      success: function (res) {
        _this.setData({
          openId: res.data
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})