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
	onload(e){
		console.log("repair",e);
	},
	//表单提交
	formSubmit(e){
		let datas = e.detail.value;
        let nickName = wx.getStorageSync("scopeInfos").nickName;

		if(datas.name=="" || datas.adress=="" || datas.textarea==""){
            wx.showLoading({
                title: "萌主调皮了哇~"
            })
            setTimeout(()=>{
                wx.hideLoading();
            },1500)
			return;
		};
		wx.request({
			url:"http://172.19.37.50/IT/index.php/mobile/submit",
			method:"POST",
            header: {"content-type": "application/x-www-form-urlencoded"},
			data:{
				name:datas.name,
				location:datas.adress,
				department:datas.picker,
				detail:datas.textarea,
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