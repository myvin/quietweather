import { CloudEnvId, HeWeatherKey, } from './accountconfig';
App({
  onLaunch () {
    // wx.cloud.init({
    //   env: CloudEnvId,
    //   traceUser: true,
    // })
    this.globalData.platform = typeof tt !== 'undefined' ? 'tt' : 'wx';
    wx.getSystemInfo({
      success: (res) => {
        this.globalData.StatusBar = res.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - res.statusBarHeight;

        this.globalData.systeminfo = res
        this.globalData.isIPhoneX = /iphonex/gi.test(res.model.replace(/\s+/, ''))
      },
    })
  },
  globalData: {
    // keepscreenon:false,
    systeminfo: {},
    isIPhoneX: false,
    key: HeWeatherKey,
    weatherIconUrl: 'https://cdn.heweather.com/cond_icon/',
    requestUrl: {
      weather: 'https://devapi.qweather.com/s6/weather',
      hourly: 'https://devapi.qweather.com/s6/weather/hourly',
    },
  },
})