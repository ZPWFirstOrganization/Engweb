$(function(){
	var data = {
		EquipmentsQuery : {
			WeiXinOpenID : 10002
		}
	};
	data = JSON.stringify(data);
	RetrieveMultipleEquipmentDrivers(data,success,error)
	function success(data){
		for (var i = 0; i < 10; i++) {
			$('ul li:first-child div div').eq(0).text("张强"+ i);
			$('ul li:first-child div div').eq(1).text("133333333"+ i);
			$('ul li:first-child .driverInput').eq(0).text("2015-01-"+i);
			$('ul li:first-child .driverInput').eq(1).text(i);
			$("ul li:first-child").clone(true).appendTo("ul");
		}
		$("<div style='height:50px;'></div>").appendTo("ul");
		$("ul li").each(function() {
			$(this).click(function() {
				alert("111")
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
})
