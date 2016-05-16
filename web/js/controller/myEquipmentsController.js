$(function(){
	var myOpenId = sessionStorage.getItem('openID')
	var data = 
		{
		EquipmentsQuery:
			{
			WeiXinOpenID:myOpenId
			}
		}
	function success (mydata) {
		console.log(mydata)
		if (!mydata.Equipments) {
			$("ul li div button:first-child").parents("li:first").css("display","none")
			return
		}
		for (var i = 0; i <= mydata.Equipments.length-1; i++) {
			$('ul li:first-child div div').eq(0).text(mydata.Equipments[i].EquipmentNumber);
			$('ul li:first-child .myCarInput').eq(0).text(mydata.Equipments[i].PurchaseDate);
			$('ul li:first-child .myCarInput').eq(1).text(mydata.Equipments[i].BuyHours);
			$('ul li:first-child .myCarInput').eq(2).text(mydata.Equipments[i].RegistrationHours);
			$('ul li:first-child .myCarInput').eq(3).text(mydata.Equipments[i].CurrentHours);
			$("ul li div button:first-child").attr("EquipmentId",mydata.Equipments[i].EquipmentId)
			$("ul li div button:first-child").click(function(){
				//alert($(this).attr("EquipmentId"))
				removeEquipment($(this).attr("EquipmentId"),$(this))
			});
			if (i>0) {
				$("ul li:first-child").clone(true).appendTo("ul");
			}
		}
	}
	
	function error (mydata) {
		
	}
	var initId = data.EquipmentsQuery.WeiXinOpenID
	data = JSON.stringify(data)
	RetrieveMultipleEquipments(data,success,error)
	
	function removeEquipment (EquipmentId,thisEle) {
		var thisdata = 
		{
			"Equipment":
			{
			"EquipmentId":EquipmentId
			}
		}
		thisdata = JSON.stringify(thisdata)
		function suc () {
			thisEle.parents("li:first").css("display","none")
		}
		
		function err () {
			alert("删除失败")
		}
		
		DisableEquipment(thisdata,suc,err)
	}
	
	$("#cars").click(function() {
		var myurl = "inputMycar.html?WeiXinOpenID="+initId;
		window.location.href = myurl
	})
})
