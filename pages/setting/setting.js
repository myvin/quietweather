let utils = require('../../utils/utils')
Page({
  data: {
    setting: {},
    show: false,
    screenBrightness: '获取中',
    keepscreenon: false,
    SDKVersion: '',
    enableUpdate: true,
  },
  switchChange(e) {
    let dataset = e.currentTarget.dataset
    let switchparam = dataset.switchparam
    let setting = this.data.setting
    if (switchparam === 'forceUpdate') {
      if (this.data.enableUpdate) {
        setting[switchparam] = (e.detail || {}).value
      } else {
        setting[switchparam] = false
        wx.showToast({
          title: '基础库版本较低，无法使用该功能',
          icon: 'none',
          duration: 2000,
        })
      }
    } else if (switchparam === 'keepscreenon') {
      this.setKeepScreenOn(!this.data.keepscreenon)
      getApp().globalData.keepscreenon = !this.data.keepscreenon
    } else {
      setting[switchparam] = !(e.detail || {}).value
    }
    this.setData({
      setting,
    })
    wx.setStorage({
      key: 'setting',
      data: setting,
    })
  },
  defaultBcg () {
    this.removeBcg(() => {
      wx.showToast({
        title: '恢复默认背景',
        duration: 1500,
      })
    })
  },
  removeBcg (callback) {
    wx.getSavedFileList({
      success: function (res) {
        let fileList = res.fileList
        let len = fileList.length
        if (len > 0) {
          for (let i = 0; i < len; i++)
          (function (path) {
            wx.removeSavedFile({
              filePath: path,
              complete: function (res) {
                if (i === len - 1) {
                  callback && callback()
                }
              }
            })
          })(fileList[i].filePath)
        } else {
          callback && callback()
        }
      },
      fail: function () {
        wx.showToast({
          title: '出错了，请稍后再试',
          icon: 'none',
        })
      },
    })
  },
  customBcg () {
    let that = this
    wx.chooseImage({
      success: function (res) {
        that.removeBcg(() => {
          wx.saveFile({
            tempFilePath: res.tempFilePaths[0],
            success: function (res) {
              wx.navigateBack({})
            },
          })
        })
      },
      fail: function (res) {
        let errMsg = res.errMsg
        // 如果是取消操作，不提示
        if (errMsg.indexOf('cancel') === -1) {
          wx.showToast({
            title: '发生错误，请稍后再试',
            icon: 'none',
          })
        }
      },
    })
  },
  hide () {
    this.setData({
      show: false,
    })
  },
  updateInstruc () {
    this.setData({
      show: true,
    })
  },
  onShow () {
    // 不能初始化到 data 里面！！！！
    this.setData({
      keepscreenon: getApp().globalData.keepscreenon,
    })
    this.ifDisableUpdate()
    this.getScreenBrightness()
    let that = this
    wx.getStorage({
      key: 'setting',
      success: function(res) {
        let setting = res.data
        that.setData({
          setting,
        })
      },
      fail: function (res) {
        that.setData({
          setting: {},
        })
      },
    })
  },
  ifDisableUpdate () {
    let systeminfo = getApp().globalData.systeminfo
    let SDKVersion = systeminfo.SDKVersion
    let version = utils.cmpVersion(SDKVersion, '1.9.90')
    if (version >=0) {
      this.setData({
        SDKVersion,
        enableUpdate: true,
      })
    } else {
      this.setData({
        SDKVersion,
        enableUpdate: false,
      })
    }
  },
  getHCEState () {
    wx.showLoading({
      title: '检测中...',
    })
    wx.getHCEState({
      success: function (res) {
        wx.hideLoading()
        wx.showModal({
          title: '检测结果',
          content: '该设备支持NFC功能',
          showCancel: false,
          confirmText: '朕知道了',
          confirmColor: '#40a7e7',
        })
      },
      fail: function (res) {
        wx.hideLoading()
        wx.showModal({
          title: '检测结果',
          content: '该设备不支持NFC功能',
          showCancel: false,
          confirmText: '朕知道了',
          confirmColor: '#40a7e7',
        })
      },
    })
  },
  getScreenBrightness () {
    let that = this
    wx.getScreenBrightness({
      success: function (res) {
        that.setData({
          screenBrightness: Number(res.value * 100).toFixed(0),
        })
      },
      fail: function (res) {
        that.setData({
          screenBrightness: '获取失败',
        })
      },
    })
  },
  screenBrightnessChanging (e) {
    this.setScreenBrightness(e.detail.value)
  },
  setScreenBrightness (val) {
    let that = this
    wx.setScreenBrightness({
      value: val / 100,
      success: function (res) {
        that.setData({
          screenBrightness: val,
        })
      },
    })
  },
  setKeepScreenOn (b) {
    let that = this
    wx.setKeepScreenOn({
      keepScreenOn: b,
      success () {
        that.setData({
          keepscreenon: b,
        })
      },
    })
  },
  getsysteminfo () {
    wx.navigateTo({
      url: '/pages/systeminfo/systeminfo',
    })
  },
  removeStorage (e) {
    let that = this
    let datatype = e.currentTarget.dataset.type
    if (datatype === 'menu') {
      wx.setStorage({
        key: 'pos',
        data: {
          top: 'auto',
          left: 'auto',
        },
        success: function (res) {
          wx.showToast({
            title: '悬浮球已复位',
          })
        },
      })
    } else if (datatype === 'setting') {
      wx.showModal({
        title: '提示',
        content: '确认要初始化设置',
        cancelText: '容朕想想',
        confirmColor: '#40a7e7',
        success(res) {
          if (res.confirm) {
            wx.removeStorage({
              key: 'setting',
              success: function (res) {
                wx.showToast({
                  title: '设置已初始化',
                })
                that.setData({
                  setting: {},
                })
              },
            })
          }
        },
      })
    } else if (datatype === 'all') {
      wx.showModal({
        title: '提示',
        content: '确认要删除',
        cancelText: '容朕想想',
        confirmColor: '#40a7e7',
        success (res) {
          if (res.confirm) {
            wx.clearStorage({
              success: function (res) {
                wx.showToast({
                  title: '数据已清除',
                })
                that.setData({
                  setting: {},
                  pos: {},
                })
              },
            })
          }
        },
      })
    }
  },

})