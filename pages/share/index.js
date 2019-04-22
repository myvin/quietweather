//index.js
let utils = require('../../utils/utils')
Page({
    data: {
        painting: {},
        shareImage: '',
        bcgImg: ''
    },
    onLoad() {
        // this.eventDraw()
        this.setBcg();
    },
    setBcg() {
        let that = this
        wx.getSavedFileList({
            success: function(res) {
                console.log(res)
                let fileList = res.fileList
                if (!utils.isEmptyObject(fileList)) {
                    that.setData({
                        bcgImg: fileList[0].filePath,
                    })
                } else {
                    that.setData({
                        bcgImg: '',
                    })
                }
            },
        })
    },
    bindGetUserInfo(e) {
        console.log(JSON.parse(e.detail.rawData))
        let user = JSON.parse(e.detail.rawData);
        this.eventDraw(user);
    },
    eventDraw(info) {
        wx.showLoading({
            title: '绘制分享图片中',
            mask: true
        })
        this.setData({
            painting: {
                width: 375,
                height: 555,
                clear: true,
                views: [{
                        type: 'image',
                    url: this.data.bcgImg !== '' ? this.data.bcgImg : 'https://www.jonathon.cn/images/bg.jpeg',
                        top: 0,
                        left: 0,
                        width: 375,
                        height: 555,
                    },
                    {
                        type: 'image',
                        url: 'https://www.jonathon.cn/images/code.jpg',
                        top: 180,
                        left: 115,
                        width: 145,
                        height: 145
                    },
                    {
                        type: 'text',
                        content: '长按识别小程序哦～',
                        fontSize: 19,
                        lineHeight: 21,
                        color: '#000000',
                        textAlign: 'left',
                        top: 430,
                        left: 110,
                        width: 285,
                        MaxLineNumber: 2,
                        breakWord: true,
                        bolder: true
                    },
                    {
                        type: 'text',
                        content: info.nickName,
                        fontSize: 16,
                        color: '#ffffff',
                        textAlign: 'left',
                        top: 33,
                        left: 96,
                        bolder: true
                    },
                    {
                        type: 'image',
                        url: info.avatarUrl,
                        top: 27.5,
                        left: 29,
                        width: 55,
                        height: 55
                    },
                    {
                        type: 'text',
                        content: '发现一款自定义背景的天气小程序',
                        fontSize: 15,
                        color: '#ffffff',
                        textAlign: 'left',
                        top: 59.5,
                        left: 96
                    },
                ]
            }

        })
    },
    eventSave() {
        wx.saveImageToPhotosAlbum({
            filePath: this.data.shareImage,
            success(res) {
                wx.showToast({
                    title: '保存图片成功',
                    icon: 'success',
                    duration: 2000
                })
            }
        })
    },
    eventGetImage(event) {
        console.log(event)
        wx.hideLoading()
        const {
            tempFilePath,
            errMsg
        } = event.detail
        if (errMsg === 'canvasdrawer:ok') {
            this.setData({
                shareImage: tempFilePath
            })
        }
    }
})