App({
    getUserInfo (cb) {
        if (this.globalData.userInfo) {
            typeof cb == "function" && cb(this.globalData.userInfo)
        } else {
            wx.login({
                success:(res)=> {
                    wx.getUserInfo({
                        success:(res)=>{
                            this.globalData.userInfo = res.userInfo;
                            this.globalData.userInfo.hasScoped = true;
                            typeof cb == "function" && cb(this.globalData.userInfo);
                        },
                        fail:()=>{
                            this.globalData.userInfo = {
                                hasScoped : false
                            };
                            typeof cb == "function" && cb(this.globalData.userInfo);
                        }
                    })
                }
            })
        }
    },
    globalData: {
        userInfo: null
    }
})
