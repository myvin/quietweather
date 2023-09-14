// component/privacy/privacy.js
Component({
    properties: {
      showPrivacy: {
        type: Boolean,
        default: false
      },
      privacyContractName: {
        type: String,
        default: ''
      },
    },
    methods: {
        openPrivacyContract() {
            const _ = this
            wx.openPrivacyContract({
                fail: () => {
                    wx.showToast({
                        title: '遇到错误',
                        icon: 'error'
                    })
                }
            })
        },
        exitMiniProgram() {
            wx.showToast({
                title: '必须同意后才可以继续使用当前小程序',
                icon: 'none'
            });
            this.triggerEvent('refuse');
        },
        handleAgreePrivacyAuthorization() {
            this.triggerEvent('agree');
        },
        handleCatchtouchMove() {
            return
        }
    },
})