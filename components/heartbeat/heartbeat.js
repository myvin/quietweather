let utils = require('../../utils/utils')
Component({
  data: {
    windowWidth: 0,
    windowHeight: 0,
    arr: [],
    // 动画最长持续时间
    duration: 5000,
    animations: [],
    lefts: [],
    tops: [],
    widths: [],
  },
  properties: {
    show: {
      type: Boolean,
      value: true
    },
  },
  ready () {
    let systeminfo = getApp().globalData.systeminfo
    if (utils.isEmptyObject(systeminfo)) {
      let that = this
      wx.getSystemInfo({
        success: function(res) {
          that.setData({
            windowWidth: res.windowWidth || res.screenWidth,
            windowHeight: res.windowHeight || res.screenHeight,
          })
        },
      })
    } else {
      this.setData({
        windowWidth: systeminfo.windowWidth || systeminfo.screenWidth,
        windowHeight: systeminfo.windowHeight || systeminfo.screenHeight,
      })
    }
    let num = parseInt(Math.random() * 100) + 10
    let arr = Array.apply(null, { length: num }).map(function (value, index) {
      return index + 1;
    })
    this.setData({
      arr,
    })
  },
  methods: {
    dance (callback) {
      let windowWidth = this.data.windowWidth
      let windowHeight = this.data.windowHeight
      let duration = this.data.duration
      let animations = []
      let lefts = []
      let tops = []
      let widths = []
      let obj = {}
      for (let i = 0; i < this.data.arr.length; i++) {
        lefts.push(Math.random() * windowWidth)
        tops.push(-140)
        widths.push(Math.random() * 50 + 40)
        let animation = wx.createAnimation({
          duration: Math.random() * (duration - 1000) + 1000
        })
        animation.top(windowHeight).left(Math.random() * windowWidth).rotate(Math.random() * 960).step()
        animations.push(animation.export())
      }
      this.setData({
        lefts,
        tops,
        widths,
      })
      let that = this
      let timer = setTimeout(() => {
        that.setData({
          animations,
        })
        clearTimeout(timer)
      }, 200)
      let end = setTimeout(() => {
        callback && callback()
        clearTimeout(end)
      }, duration)
    },
  },
})