// layout/layout.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
  },

  /**
   * 组件的初始数据
   */
  data: {
    scroll_WH: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    scroll: function (e) {
      // console.log(e)
    },
    upper: function (e) {
      console.log(e)
    },
    lower: function (e) {
      console.log(e)
    },
  },
  ready: function () {
    var WH = 0;
    wx.getSystemInfo({
      success: function (res) {
        WH = res.windowHeight + "px";
      }
    })
    this.setData({
      scroll_WH: WH
    });
  },
 
})
