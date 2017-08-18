let app = getApp();
Page({
    data: {
        isScope:false, //是否授权
        userInfo: {}
    },
    onLoad(){
        //调用应用实例的方法获取全局数据
        app.getUserInfo((userInfo)=>{
            if(userInfo.hasScoped){
                this.setData({
                    userInfo: userInfo,
                    isScope:true
                })
                wx.setStorage({
                    key:"scopeInfos",
                    data:userInfo
                })
            }else{
                this.setData({
                    userInfo: {
                        nickName:"萌主，您还没有授权~"
                    }
                })
            }
        })
    },
    onShow(){
        if( this.data.userInfo.hasScoped == undefined && !this.data.isScope){
            wx.getStorage({
                key: "scopeInfos",
                success: (res)=> {
                    this.setData({
                        userInfo: res.data,
                        isScope:res.data.isScope
                    })
                }
            })
        }
    },
    //我要报修
    newRepair(){
        if(this.data.isScope){
            this.skipToRepair();
        }else{
            this.scopeAgain(()=>{
                this.skipToRepair();
            });
        }
    },
    //报修记录
    repairRecord(){
        if(this.data.isScope){
            this.skipToRecord();
        }else{
            this.scopeAgain(()=>{
                this.skipToRecord();
            });
        }
    },
    skipToRepair(){
        wx.navigateTo({
            url: "../repair/repair"
        })
    },
    skipToRecord(){
        wx.navigateTo({
            url: "../record/record"
        })
    },
    //跳转前确认是否授权
    scopeAgain(cb){
        wx.showModal({
            title:"哎呦喂，萌主",
            content:"需要授权的呀！",
            cancelText:"拒绝",
            confirmText:"允许",
            success: (res)=> {
                if (res.confirm) {
                    wx.openSetting({
                        success: (res) => {
                            wx.getSetting({
                                success: (res) => {
                                    if(res.authSetting["scope.userInfo"] != "undefined" && res.authSetting["scope.userInfo"]){
                                        wx.getUserInfo({
                                            success:(res) =>{
                                                res.userInfo.isScope = true;
                                                wx.setStorage({
                                                    key:"scopeInfos",
                                                    data:res.userInfo,
                                                    success:()=>{
                                                        typeof cb == "function" && cb();
                                                    }
                                                })
                                            }
                                        })

                                    }
                                }
                            })
                        }
                    })
                }
            }
        })
    }
})
