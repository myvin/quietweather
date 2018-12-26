# QuietWeather
一款天气应用微信小程序
<p align='center'>
    <img src='https://user-gold-cdn.xitu.io/2018/7/5/1646880a97f2c931?w=344&h=344&f=jpeg&s=66247'>
</p>

## 说明

I、气象数据由[百度地图开放平台]((https://lbsyun.baidu.com/))修改为了[和风天气](http://www.heweather.com/)，需要注册账号获取 `key`；免费版只能获取三天的天气数据，若要获取七天的气象数据，可以申请个人开发者认证；

II、`d0e51c8` 版本之后为[小程序云开发](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)版本，若未开通云开发功能，为不影响小程序正常运行，可以将版本号回退到 `git reset d0e51c8 --hard`，或，将云开发相关代码注释掉(包括：`app.js` 中的初始化、`index.js` 中获取 `message` 的代码)。若开通了云开发功能，可将相应代码部署到云上。

## 截图
<div >
    <img src='https://raw.githubusercontent.com/myvin/miniprogram/master/quietweather/images/screenshot_1.png' style='width:300px;'>
    <img src='https://raw.githubusercontent.com/myvin/miniprogram/master/quietweather/images/screenshot_2.png' style='width:300px;'>
    <img src='https://raw.githubusercontent.com/myvin/miniprogram/master/quietweather/images/screenshot_3.png' style='width:300px;'>
    <img src='https://raw.githubusercontent.com/myvin/miniprogram/master/quietweather/images/screenshot_4.png' style='width:300px;'>

<img src='https://raw.githubusercontent.com/myvin/miniprogram/master/quietweather/images/screenshot_5.png' style='width:300px;'>
<img src='https://raw.githubusercontent.com/myvin/miniprogram/master/quietweather/images/screenshot_6.png' style='width:300px;'></div>

## 数据来源
~~地理编码、天气数据均来自[百度地图开放平台](https://lbsyun.baidu.com/)。个人开发完全免费，有对应的小程序 `sdk`，加入即可，但是返回的天气数据较少。~~

气象数据更换为了[和风天气](http://www.heweather.com/)，**使用的是个人开发者认证版**。

## 运行前准备
> * [注册微信小程序](https://mp.weixin.qq.com/wxopen/waregister?action=step1)，获取 `appid`，配置域名白名单(在小程序后台将使用到的 `API` 添加到域名白名单)；
> * ~~注册[百度地图开放平台](https://lbsyun.baidu.com/)开发者，创建应用 **（注意：应用类型选择微信小程序时，请填写真实的小程序 appid）** ，获取 `ak`（其他配置可自行查看）；~~
> * 注册[和风天气](http://www.heweather.com/)账号，获取 'key`；
> * ~~在 `app.js` 中替换 `globalData` 中的 `ak` 为自己的 `ak`；~~
> * 在 `app.js` 中替换 `globalData` 中的 `key` 为你的 `key`；
> * Run and Enjoy!

## 请喝咖啡
如果我的项目对你有帮助，可以请我喝杯咖啡噢~

### 支付宝

<img src="https://raw.githubusercontent.com/myvin/miniprogram/master/9181893579988_.pic_hd.jpg" width="300" /> <img src="https://raw.githubusercontent.com/myvin/miniprogram/master/9191893579989_.pic.jpg" width="300" />

### 微信

<img src="https://raw.githubusercontent.com/myvin/miniprogram/master/9201893579990_.pic_hd.jpg" width="300" />

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018-present, myvin
