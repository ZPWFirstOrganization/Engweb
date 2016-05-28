$(function(){
	function success(data){
		console.log("对了")
		console.log(data)
		if (!data.EquipmentDailyStatus||data.EquipmentDailyStatus.length < 1) {
			$('ul li:first-child div div').parents("li:first").css("display","none")
			//window.location.href = "equipments.html"
			return
		}
		for (var i=0;i<=data.EquipmentDailyStatus.length-1;i++) {
			$('ul li:first-child div div').eq(0).text(data.EquipmentDailyStatus[i].BrandName+ " " +data.EquipmentDailyStatus[i].ModelName);
			$('ul li:first-child div div').eq(1).text(data.EquipmentDailyStatus[i].DriverName);
			if (data.EquipmentDailyStatus[i].DailyServiceHours&&data.EquipmentDailyStatus[i].DailyServiceHours!=0) {
				$('ul li:first-child .myCarInput').eq(0).text("正常状态");//显示状态
			} else{
				$('ul li:first-child .myCarInput').eq(0).text("");//显示状态
			}
			
			$('ul li:first-child .myCarInput').eq(1).text(data.EquipmentDailyStatus[i].DailyServiceHours);
			$('ul li:first-child .myCarInput').eq(2).text(data.EquipmentDailyStatus[i].ServiceHours);
			$('ul li:first-child .myCarInput').eq(3).text(data.EquipmentDailyStatus[i].CurrentHours);
			$('ul li:first-child').attr("thisEquipmentId",data.EquipmentDailyStatus[i].EquipmentId)
			if (i!=data.EquipmentDailyStatus.length - 1) {
				$("ul li:first-child").clone(true).appendTo("ul");
			}
		}
		$("<div style='height:50px;'></div>").appendTo("ul");
		$("ul li").each(function() {
			$(this).click(function() {
				sessionStorage.setItem('currentEquipmentId',$(this).attr("thisEquipmentId"))
				var isJustCheck = true
				var myurl = "inputMycar.html?isJustCheck = " + isJustCheck;
				window.location.href = myurl
			})
		})
	};
	
	function error (msg) {
		console.log("发生错误")
		console.log(msg)
	}
	
	function getOpenId() {
//		sessionStorage.setItem('openID',"o_3jVt-TNytKWeN_6UDnLhktknYo")//用于本地测试
//		sessionStorage.setItem('openID',"o_3jVt5mzq5Osb_nNylZlzsvw9eE")
//		init()//用于本地测试

		if(!sessionStorage.getItem('openID')){
			GetWeiXinUserInfo('{"WeiXinCode":{"Code":'+$.getUrlParam('code')+'}}',function(res){
				if(res.UserInfo.openid){
					sessionStorage.setItem('openID',res.UserInfo.openid)
					init()
				}
			},function(res){
				// sessionStorage.setItem('openID',res.UserInfo.openid)
				// init(res.UserInfo.openid)
				sessionStorage.setItem('openID',null)
				init()
				alert("微信openId获取失败，请退出重试")
			})
		}else{
			init()		
		}
	}
	
	
	getOpenId()
//	init()
	function init(){
		var myOpenId = sessionStorage.getItem('openID')
		var data ={
		"EquipmentDailyStatusQuery":
				{
//				"WeiXinUserType":"Owner",
				"WeiXinOpenID":myOpenId
//				"WeiXinOpenID":"o_3jVt-TNytKWeN_6UDnLhktknYo"

				}
		}
	
		data = JSON.stringify(data);
		RetrieveMultipleEquipmentDailyStatus(data,success,error)
	}
	
	$("#cars").click(function() {
//		window.location.href = "equipments.html"
		var myurl = "inputMycar.html?isJustCheck=";
		window.location.href = myurl
	})
	$("#dirvers").click(function() {
		window.location.href = "myDrivers.html"
	})
})


