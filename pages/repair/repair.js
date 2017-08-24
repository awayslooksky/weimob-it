Page({
	data:{
		deCurIndex:0,
		deArr:["IT","行政"]
	},
	//我的报修记录
	checkRecord(){
		wx.navigateTo({
			"url":"../record/record"
		})
	},
	//报修部门
	bindPickerChange(e){
		this.setData({
			deCurIndex:e.detail.value
		})
	},
	//表单提交
	formSubmit(e){
		let datas = e.detail.value;
        let nickName = wx.getStorageSync("scopeInfos").nickName;

		if(datas.name=="" || datas.adress=="" || datas.content==""){
            wx.showLoading({
                title: "萌主调皮了哇~"
            })
            setTimeout(()=>{
                wx.hideLoading();
            },1000)
			return;
		};
		wx.request({
			url:"https://repair.weimob.com/index.php/mobile/submit",
			method:"POST",
            header: {"content-type": "application/x-www-form-urlencoded"},
			data:{
				name:datas.name,
				location:datas.adress,
				department:datas.department,
				detail:datas.content,
				wid:nickName
			},
			success:(res)=>{
				wx.showToast({
					title: "成功",
					icon: "success",
					duration: 2000,
					success:()=> {
                        wx.navigateTo({
                            url: "../record/record"
                        })
                    }
				})
			},
            fail:(res)=>{
                wx.showToast({
                    title: "出错了哦",
                    icon: "success",
                    duration: 2000
                })
            }
		})
	}
})