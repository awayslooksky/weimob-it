Page({
	data:{
		curNav:0,
		listData:[],
		hasData:false
	},
	onLoad(){
		this.getListData(0);
	},
	swichNav(e){
		if(this.data.curNav != e.target.dataset.cur){
            this.setData({
				curNav:e.target.dataset.cur
			})
		}
        this.getListData(e.target.dataset.cur);
	},
	getListData(status){
        let nickName = wx.getStorageSync("scopeInfos").nickName;
		wx.request({
			url:"http://172.19.37.50/IT/index.php/mobile/list",
            data:{
		 		wid:nickName,
				status:status
			},
			success:(res)=>{
				if(!res.data.code){
					if(res.data.data.length>0){
                        this.setData({
                            hasData:true,
                            listData:res.data.data
                        })
					}
				}else{
                    wx.showToast({
                        title: "出错了哦",
                        icon: "success",
                        duration: 2000
                    })
				}
			}
		})
	},
    backToIndex() {
        wx.redirectTo({
            url: "../index/index"
        })
    }
})