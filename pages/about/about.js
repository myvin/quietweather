let utils = require('../../utils/utils')
Page({
  data: {
    github: 'https://github.com/myvin',
    email: '851399101@qq.com',
    qq: '851399101',
    swiperHeight: 'auto',
    bannerImgList: [
      'https://raw.githubusercontent.com/myvin/miniprogram/master/quietweather/images/logo.png',  'https://raw.githubusercontent.com/myvin/miniprogram/master/quietweather/images/miniqrcode.jpg',
    ],
  },
  onLoad () {
    this.initSwiper()
  },
  previewImages (e) {
    let index = e.currentTarget.dataset.index || 0
    let urls = this.data.bannerImgList
    wx.previewImage({
      current: urls[index],
      urls,
      success: function (res) { },
      fail: function (res) {
        console.error('previewImage fail: ', res)
      }
    })
  },
  initSwiper () {
    let that = this
    let systeminfo = getApp().globalData.systeminfo
    if (utils.isEmptyObject(systeminfo)) {
      wx.getSystemInfo({
        success: function (res) {
          that.setSwiperHeight(res)
        },
      })
    } else {
      that.setSwiperHeight(systeminfo)
    }
  },
  setSwiperHeight (res) {
    this.setData({
      swiperHeight: `${(res.windowWidth || res.screenWidth) / 375 * 200}px`
    })
  },
  copy(e) {
    let dataset = (e.target || {}).dataset || {}
    let title = dataset.title || ''
    let content = dataset.content || ''
    wx.setClipboardData({
      data: content,
      success () {
        wx.showToast({
          title: `已复制${title}`,
          duration: 2000,
        })
      },
    })
  },
})