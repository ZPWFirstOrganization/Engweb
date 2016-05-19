$(function(){
	var myOpenId = sessionStorage.getItem('openID')
	var data = {
		EquipmentDriversQuery : {
			WeiXinOpenID : myOpenId
		}
	};
	data = JSON.stringify(data);
	RetrieveMultipleEquipmentDrivers(data,success,error)
	function success(data){
		if (!data||!data.EquipmentDrivers||data.EquipmentDrivers.length <= 0) {
			$('ul').css("display","none")
			if (data&&data.ReturnValue) {
				alert(data.ReturnValue)
			}else{
				alert("发生错误")
			}
			return
		}
		for (var i = 0; i < data.EquipmentDrivers.length; i++) {
			$('ul li:first-child div div').eq(0).text(data.EquipmentDrivers[i].DriverName);
			$('ul li:first-child div div').eq(1).text(data.EquipmentDrivers[i].MobilePhone);
			$('ul li:first-child .driverInput').eq(0).text(data.EquipmentDrivers[i].EmploymentStartDate);
			$('ul li:first-child .driverInput').eq(1).text(data.EquipmentDrivers[i].ServiceHours);		
			$("ul li:first-child").click({mydata:data.EquipmentDrivers[i]},function(event) {
				alert(event.data.mydata.DriverId)
				window.location.href=''
			})
			if (i!=data.EquipmentDrivers.length - 1) {
				$("ul li:first-child").clone(true).appendTo("ul");
			}	
		}
		$("<div style='height:50px;'></div>").appendTo("ul");
//		$("ul li").each(function() {
//			$(this).click(function() {
//				alert("111")
//				window.location.href=''
//			})
//		})
		console.log("对了")
		console.log(data)
	};
	
	function error (msg) {
		console.log("发生错误")
		console.log(msg)
	}
})
