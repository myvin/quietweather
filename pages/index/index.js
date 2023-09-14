import { BackgroundImageList, EnvironmentVars, BroadCastMessages } from '../../constant';
import * as apis from '../../utils/apis'
let utils = require('../../utils/utils')
let globalData = getApp().globalData
let SYSTEMINFO = globalData.systeminfo
let rewardedVideoAd = null;
Page({
  data: {
    transparentClass: 'transparentClass',
    isIPhoneX: globalData.isIPhoneX,
    message: '',
    cityData: {},
    weatherDataNow: {},
    weatheData7d: {},
    weatherData24h: {},
    indicesData1d: {},
    weatherIconUrl: globalData.weatherIconUrl,
    EnvironmentVars: {
      key: ['tmp', 'fl', 'hum', 'pcpn', 'wind_dir', 'wind_deg', 'wind_sc', 'wind_spd', 'vis', 'pres', 'cloud', ''],
      val: EnvironmentVars,
    },
    // 用来清空 input
    searchText: '',
    // 是否已经弹出
    hasPopped: false,
    animationMain: {},
    animationOne: {},
    animationTwo: {},
    animationThree: {},
    // 需要查询的城市
    searchCity: '',
    setting: {},
    bcgImgList: BackgroundImageList,
    bcgImgIndex: 0,
    bcgImg: '',
    bcgImgAreaShow: false,
    bcgColor: '#2d2225',
    // 粗暴直接：移除后再创建，达到初始化组件的作用
    showHeartbeat: true,
    // heartbeat 时禁止搜索，防止动画执行
    enableSearch: true,
    openSettingButtonShow: false,
    shareInfo: {},
    isWx: getApp().globalData.platform === 'wx',
    showPrivacy: false,
    privacyContractName: '',
  },

  onLoad () {
    this.setBcgImg()
    this.reloadInitSetting()
    this.reloadGetBroadcast()
    wx.getPrivacySetting({
      success: (res)=> {
          if (res.needAuthorization) {
              this.setData({
                  showPrivacy: true,
                  privacyContractName: res.privacyContractName,
              })
          } else {
            this.getLocationWeather();
          }
      }
    });

    // this.initRewardedVideo();
  },
  getLocationWeather() {
    wx.getLocation({
      success: (res) => {
        this.searchWeather(`${res.longitude},${res.latitude}`);
      },
      fail: (res) => {
        this.wxGetLocationFail(res)
      }
    })
  },
  async searchWeather (keyWord) {
    try {
      var cityDatas = await apis.lookUpCity(keyWord);
      if (!cityDatas || cityDatas.location.length <= 0) {
        wx.showToast({
          title: '查询失败',
          icon: 'none',
        })
        return;
      }
      apis.getAllWeatherData(`${cityDatas.location[0].lon},${cityDatas.location[0].lat}`, (data) => {
        wx.stopPullDownRefresh()
        this.setData({
          openSettingButtonShow: false,
          cityData: cityDatas.location[0],
          weatherDataNow: data[0],
          weatherData7d: data[1],
          weatherData24h: data[2],
          indicesData1d: data[3],
        })
      }, (e) => {
        wx.showToast({
          title: '查询失败',
          icon: 'none',
        })
      });
    } catch (e) {
      wx.showToast({
        title: '查询失败',
        icon: 'none',
      })
    }
  },
  wxGetLocationFail(res) {
    wx.stopPullDownRefresh()
    let errMsg = res.errMsg || ''
    // 拒绝授权地理位置权限
    console.error('res ', res)
    if (res.errCode === 2) {
      wx.showModal({
        title: '提示',
        content: '无法定位，请打开手机定位',
      })
    } else if (errMsg.indexOf('deny') !== -1 || errMsg.indexOf('denied') !== -1) {
      wx.showToast({
        title: '需要开启地理位置权限',
        icon: 'none',
        duration: 2500,
        success: (res) => {
          if (this.canUseOpenSettingApi()) {
            let timer = setTimeout(() => {
              clearTimeout(timer)
              wx.openSetting({})
            }, 2500)
          } else {
            this.setData({
              openSettingButtonShow: true,
            })
          }
        },
      })
    } else {
      wx.showToast({
        title: '网络不给力，请稍后再试',
        icon: 'none',
      })
    }
  },
  // initRewardedVideo () {
  //   rewardedVideoAd = wx.createRewardedVideoAd({
  //     adUnitId: 'adunit-5598044ee112a568'
  //   });
  //   rewardedVideoAd.onLoad(() => {});
  //   rewardedVideoAd.onError((err) => {});
  //   rewardedVideoAd.onClose((res) => {});
  // },
  showRewardedVideo () {
    rewardedVideoAd.show().catch(() => {
      rewardedVideoAd.load()
        .then(() =>  rewardedVideoAd.show())
        .catch(err => {
          console.log('激励视频 广告显示失败')
        })
    });
  },
  showInterstitialAd () {
    // 在页面中定义插屏广告
    let interstitialAd = null

    // 在页面onLoad回调事件中创建插屏广告实例
    if (wx.createInterstitialAd) {
      interstitialAd = wx.createInterstitialAd({
        adUnitId: 'adunit-c83634ff3bc695cd'
      })
      interstitialAd.onLoad(() => { })
      interstitialAd.onError((err) => { })
      interstitialAd.onClose(() => { })
    }

    // 在适合的场景显示插屏广告
    if (interstitialAd) {
      interstitialAd.show().catch((err) => {
        console.error(err)
      })
    }
  },
  commitSearch (res) {
    this.showInterstitialAd()
    let val = ((res.detail || {}).value || '').replace(/\s+/g, '')
    this.search(val)
  },
  dance() {
    this.setData({
      enableSearch: false,
    })
    let heartbeat = this.selectComponent('#heartbeat')
    heartbeat.dance(() => {
      this.setData({
        showHeartbeat: false,
        enableSearch: true,
      })
      this.setData({
        showHeartbeat: true,
      })
    })
  },
  clearInput () {
    this.setData({
      searchText: '',
    })
  },
  search (val) {
    if (val === '520' || val === '521') {
      this.clearInput()
      this.dance()
      return
    }
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300,
    })
    if (val) {
      this.searchWeather(val)
      this.clearInput()
    }
  },
  // wx.openSetting 要废弃，button open-type openSetting 2.0.7 后支持
  // 使用 wx.canIUse('openSetting') 都会返回 true，这里判断版本号区分
  canUseOpenSettingApi () {
    let systeminfo = getApp().globalData.systeminfo
    let SDKVersion = systeminfo.SDKVersion
    let version = utils.cmpVersion(SDKVersion, '2.0.7')
    if (version < 0) {
      return true
    } else {
      return false
    }
  },
  onPullDownRefresh (res) {
    this.getLocationWeather();
  },
  setBcgImg (index) {
    if (index !== undefined) {
      this.setData({
        bcgImgIndex: index,
        bcgImg: this.data.bcgImgList[index].src,
        bcgColor: this.data.bcgImgList[index].topColor,
      })
      this.setNavigationBarColor()
      return
    }
    wx.getStorage({
      key: 'bcgImgIndex',
      success: (res) => {
        let bcgImgIndex = res.data || 0
        this.setData({
          bcgImgIndex,
          bcgImg: this.data.bcgImgList[bcgImgIndex].src,
          bcgColor: this.data.bcgImgList[bcgImgIndex].topColor,
        })
        this.setNavigationBarColor()
      },
      fail: () => {
        this.setData({
          bcgImgIndex: 0,
          bcgImg: this.data.bcgImgList[0].src,
          bcgColor: this.data.bcgImgList[0].topColor,
        })
        this.setNavigationBarColor()
      },
    })
  },
  setNavigationBarColor (color) {
    let bcgColor = color || this.data.bcgColor
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: this.data.bcgColor,
    })
  },
  // getBroadcast (callback) {
  //   wx.cloud.callFunction({
  //     name: 'getBroadcast',
  //     data: {
  //       hour: new Date().getHours(),
  //     },
  //   })
  //   .then(res => {
  //     let data = res.result.data
  //     if (data) {
  //       callback && callback(data[0].message)
  //     }
  //   })
  // },
  reloadGetBroadcast () {
    // this.getBroadcast((message) => {
    //   this.setData({
    //     message,
    //   })
    // })
    const len = BroadCastMessages.length;
    const index = Math.floor(Math.random() * len);
    this.setData({
      message: BroadCastMessages[index],
    });
  },
  agreePrivacy () {
    this.setData({
      showPrivacy: false
    })
    this.getLocationWeather();
  },
  checkUpdate (setting) {
    // 兼容低版本
    if (!setting.forceUpdate || !wx.getUpdateManager) {
      return
    }
    let updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate((res) => {
      console.error(res)
    })
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已下载完成，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            updateManager.applyUpdate()
          }
        }
      })
    })
  },
  showBcgImgArea () {
    this.setData({
      bcgImgAreaShow: true,
    })
  },
  hideBcgImgArea () {
    this.setData({
      bcgImgAreaShow: false,
    })
  },
  chooseBcg (e) {
    let dataset = e.currentTarget.dataset
    let src = dataset.src
    let index = dataset.index
    this.setBcgImg(index)
    wx.setStorage({
      key: 'bcgImgIndex',
      data: index,
    })
  },
  toCitychoose () {
    wx.navigateTo({
      url: '/pages/citychoose/citychoose',
    })
  },
  initSetting (successFunc) {
    wx.getStorage({
      key: 'setting',
      success: (res) => {
        let setting = res.data || {}
        this.setData({
          setting,
        })
        successFunc && successFunc(setting)
      },
      fail: () => {
        this.setData({
          setting: {},
        })
      },
    })
  },
  reloadInitSetting () {
    this.initSetting((setting) => {
      this.checkUpdate(setting)
    })
  },
  onShareAppMessage () {
    return {
      title: '出行天气早知道',
      path: '/pages/index/index',
      imageUrl: '/img/share/img1.png',
    }
  },
  onShareTimeline () {
    return {
      title: '出现天气早知道',
    }
  },
  menuHide () {
    if (this.data.hasPopped) {
      this.takeback()
      this.setData({
        hasPopped: false,
      })
    }
  },
  menuMain () {
    if (!this.data.hasPopped) {
      this.popp()
      this.setData({
        hasPopped: true,
      })
    } else {
      this.takeback()
      this.setData({
        hasPopped: false,
      })
    }
  },
  menuToCitychoose () {
    this.menuMain()
    wx.navigateTo({
      url: '/pages/citychoose/citychoose',
    })
  },
  menuToSetting () {
    this.menuMain()
    wx.navigateTo({
      url: '/pages/setting/setting',
    })
  },
  menuToAbout () {
    this.menuMain()
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },
  popp() {
    let animationMain = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-out'
    })
    let animationOne = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-out'
    })
    let animationTwo = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-out'
    })
    let animationThree = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-out'
    })
    let animationFour = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-out'
    })
    animationMain.rotateZ(180).step()
    animationOne.translate(0, -60).rotateZ(360).opacity(1).step()
    animationTwo.translate(-Math.sqrt(3600 - 400), -30).rotateZ(360).opacity(1).step()
    animationThree.translate(-Math.sqrt(3600 - 400), 30).rotateZ(360).opacity(1).step()
    animationFour.translate(0, 60).rotateZ(360).opacity(1).step()
    this.setData({
      animationMain: animationMain.export(),
      animationOne: animationOne.export(),
      animationTwo: animationTwo.export(),
      animationThree: animationThree.export(),
      animationFour: animationFour.export(),
    })
  },
  takeback() {
    let animationMain = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-out'
    })
    let animationOne = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-out'
    })
    let animationTwo = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-out'
    })
    let animationThree = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-out'
    })
    let animationFour = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-out'
    })
    animationMain.rotateZ(0).step();
    animationOne.translate(0, 0).rotateZ(0).opacity(0).step()
    animationTwo.translate(0, 0).rotateZ(0).opacity(0).step()
    animationThree.translate(0, 0).rotateZ(0).opacity(0).step()
    animationFour.translate(0, 0).rotateZ(0).opacity(0).step()
    this.setData({
      animationMain: animationMain.export(),
      animationOne: animationOne.export(),
      animationTwo: animationTwo.export(),
      animationThree: animationThree.export(),
      animationFour: animationFour.export(),
    })
  },
})