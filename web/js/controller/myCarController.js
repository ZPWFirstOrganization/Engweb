$(function(){
	var data ={
		"Equipment":
				{
				"EquipmentId":"0ced7514-64fa-e511-9417-ab581d3f6b3c"
				}
		}
	data = JSON.stringify(data);
	function success(data){
		if (!data.EquipmentDrivers) {
			$('ul li:first-child div div').parents("li:first").css("display","none")
			return
		}
		for (var i=0;i<=data.EquipmentDrivers.length-1;i++) {
			$('ul li:first-child div div').eq(0).text(data.EquipmentNumber);
			$('ul li:first-child div div').eq(1).text(data.EquipmentDrivers[i].DriverName);
			$('ul li:first-child .myCarInput').eq(0).text("正常作业");
			$('ul li:first-child .myCarInput').eq(1).text(100);
			$('ul li:first-child .myCarInput').eq(2).text(data.RegistrationHours);
			$('ul li:first-child .myCarInput').eq(3).text(data.CurrentHours);
			if (i>0) {
				$("ul li:first-child").clone(true).appendTo("ul");
			}
		}
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
	
	RetrieveSingleEquipment(data,success,error)
	$("#cars").click(function() {
		window.location.href = "equipments.html"
	})
	$("#dirvers").click(function() {
		window.location.href = "myDrivers.html"
	})
})
