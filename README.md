# QuietWeather
一款天气应用微信小程序
<p align='center'>
    <img src='https://user-gold-cdn.xitu.io/2018/7/5/1646880a97f2c931?w=344&h=344&f=jpeg&s=66247'>
</p>

## 截图
<div>
    <img style='display:block;width:25%;float:left;' src='https://raw.githubusercontent.com/myvin/miniprogram/master/quietweather/images/screenshot_1.png'>
    <img style='display:block;width:25%;float:left;'  src='https://raw.githubusercontent.com/myvin/miniprogram/master/quietweather/images/screenshot_2.png'>
    <img style='display:block;width:25%;float:left;'  src='https://raw.githubusercontent.com/myvin/miniprogram/master/quietweather/images/screenshot_3.png'>
    <img style='display:block;width:25%;float:left;'  src='https://raw.githubusercontent.com/myvin/miniprogram/master/quietweather/images/screenshot_4.png'>
</div>

## 数据来源
地理编码、天气数据均来自[百度地图开放平台](https://lbsyun.baidu.com/)。个人开发完全免费，有对应的小程序 sdk，加入即可，但是返回的天气数据较少。

## 运行前准备
> * [注册微信小程序](https://mp.weixin.qq.com/wxopen/waregister?action=step1)，获取 `appid`，配置域名白名单(在小程序后台将使用到的 `API` 添加到域名白名单)；
> * 注册[百度地图开放平台](https://lbsyun.baidu.com/)开发者，创建应用 **（注意：应用类型选择微信小程序时，请填写真实的小程序 APPID）** ，获取 `ak`（其他配置可自行查看）；
> * 在 `app.js` 中替换 `globalData` 中的 `ak` 为自己的 `ak`；
> * Run and Enjoy!
