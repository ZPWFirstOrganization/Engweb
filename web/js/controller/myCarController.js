$(function(){
	function success(data){
		if (!data.EquipmentStatus) {
			$('ul li:first-child div div').parents("li:first").css("display","none")
			window.location.href = "equipments.html"
			//return
		}
//		for (var i=0;i<=data.EquipmentStatus.length-1;i++) {
//			$('ul li:first-child div div').eq(0).text(data.EquipmentNumber);
//			$('ul li:first-child div div').eq(1).text(data.EquipmentStatus[i].DriverName);
//			$('ul li:first-child .myCarInput').eq(0).text("正常作业");
//			$('ul li:first-child .myCarInput').eq(1).text(100);
//			$('ul li:first-child .myCarInput').eq(2).text(data.RegistrationHours);
//			$('ul li:first-child .myCarInput').eq(3).text(data.CurrentHours);
//			if (i!=data.EquipmentDrivers.length - 1) {
//				$("ul li:first-child").clone(true).appendTo("ul");
//			}
//		}
		$("<div style='height:50px;'></div>").appendTo("ul");
		$("ul li").each(function() {
			$(this).click(function() {
				window.location.href=''
			})
		})
		console.log("对了")
		console.log(data)
	};
	
	function error (msg) {
		console.log("发生错误")
		console.log(msg)
	}
	
	function getOpenId() {
		if(!sessionStorage.getItem('openID')){
			GetWeiXinUserInfo('{"WeiXinCode":{"Code":'+$.getUrlParam('code')+'}}',function(res){
				if(res.UserInfo.openid){
					sessionStorage.setItem('openID',res.UserInfo.openid)
					init()
				}
			},function(res){
				// sessionStorage.setItem('openID',res.UserInfo.openid)
				// init(res.UserInfo.openid)
				console.log("cannot get openId")
			})
		}else{
			init()		
		}
	}
	
	
	getOpenId()
	function init(){
		var myOpenId = sessionStorage.getItem('openID')
		var data ={
		"EquipmentStatusQuery":
				{
				"WeiXinUserType":"Owner",
				"WeiXinOpenID":myOpenId

				}
		}
	
		data = JSON.stringify(data);
		RetrieveMultipleEquipmentStatus(data,success,error)
	}
	
	$("#cars").click(function() {
		window.location.href = "equipments.html"
	})
	$("#dirvers").click(function() {
		window.location.href = "myDrivers.html"
	})
})


