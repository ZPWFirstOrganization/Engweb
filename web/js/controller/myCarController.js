$(function(){
	var data = {
		EquipmentsQuery : {
			WeiXinOpenID : 11111111
		}
	};
	data = JSON.stringify(data);
	function success(data){
		for (var i in data.Equipments) {
			$('ul li:first-child div div').eq(0).text(i.EquipmentNumber);
			$('ul li:first-child div div').eq(1).text("张强"+ i);
			$('ul li:first-child .myCarInput').eq(0).text("正常作业");
			$('ul li:first-child .myCarInput').eq(1).text(100);
			$('ul li:first-child .myCarInput').eq(2).text(i.RegistrationHours);
			$('ul li:first-child .myCarInput').eq(3).text(i.CurrentHours);
			$("ul li:first-child").clone(true).appendTo("ul");
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
	
	RetrieveMultipleEquipments(data,success,error)
})
