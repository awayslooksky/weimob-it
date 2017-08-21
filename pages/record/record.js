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
            title: "加载中",
        })
		wx.request({
			url:"http://172.19.37.52/IT/index.php/mobile/list",
            data:{
		 		wid:nickName,
				status:status
			},
			success:(res)=>{
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
                wx.hideLoading();
			}
		})
	},
    backToIndex() {
        wx.redirectTo({
            url: "../index/index"
        })
    }
})