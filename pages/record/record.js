Page({
	data:{
		curNav:0,
		listData:[]
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
        wx.showLoading({
            title: "加载中"
        })
		wx.request({
			url:"https://repair.weimob.com/index.php/mobile/repairList",
            data:{
		 		wid:nickName,
				status:status
			},
			success:(res)=>{
                wx.hideLoading();
				if(!res.data.code){
					if(res.data.data.length>0){
                        this.setData({
                            hasData:"1",
                            listData:res.data.data
                        })
					}else{
                        this.setData({
                            hasData:"0"
                        })
					}
				}else{
                    this.setData({
                        hasData:"2"
                    })
				}
			}
		})
	},
    backToIndex() {
        wx.reLaunch({
            url: "../index/index"
        })
    }
})