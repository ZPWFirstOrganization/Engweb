/**
 * Created by chaos on 2016/3/1.
 */
$(function(){
	$.choose=function(opt){
	    var mydata = {
			VehicleType:
				{
					VehicleType:1
				}
		};
		var mydata1 = {
			VehicleType:
				{
					VehicleType:2
				}
		};
		mydata = JSON.stringify(mydata);
		mydata1 = JSON.stringify(mydata1);
		var type1Data,type2Data
		function success(thisdata) {
			//window.choose_data=thisdata;
			type1Data = thisdata
			RetrieveMultipleBrandModel(mydata1,success1,error)
			/*for (var i=0;i<thisdata.Equipments.length;i++) 
			{		
				if (thisdata.Equipments[i].VehicleType == 1) {
					wajueji.push(thisdata.Equipments[i])
				}else{
					zhuangzaiji.push(thisdata.Equipments[i])
				}
			}*/
		}
		function success1(thisdata) {
			type2Data=thisdata
			console.log("type2Data")
			console.log(type2Data)
			selectCars()
		}
		function error(thisdata) {
			console.log("error:")
			console.log(thisdata)
		}
		
		RetrieveMultipleBrandModel(mydata,success,error)
	    function selectCars () {
	    	var ohtml= 
	    	'<div class="selectMyCarDiv">' +
		    	'<button id="LoaderCar" class="selectdMyCarBtnClass selectMycarBtn" style="margin-left: 30%;">装载机</button>' +
		    	'<button id="excavatingCar" class="selectMycarBtn" style="margin-right: 30%;">挖掘机</button>' +
	    	'</div>'
	    	
		    $('body').append(ohtml);
		    $(".selectMyCarDiv > button").each(function() {
	            	$(this).click(function(i,v) {
	            		inBtnClick($(this))
	            	})
	           });
	        $(".selectMyCarDiv > button").eq(0).click()
	        //window.choose_data.root
	        //window.choose_data.root_data
	        function createList(thisdata,typeId) {
	        	var thistype = typeId
		        var html = '<div class="equipment-list">'+
		            ' <div class="el-left">'+
		            '   <ul>';
		        $.each(thisdata.Brands,function(i,v){
		            if(i==0){
		                html+='<li class="hover-li">'+v.BrandName+'</li>';
		            }else{
		                html+=' <li>'+v.BrandName+'</li>';
		            }
		        });
		        html+=  '       </ul>'+
		            '   </div>'+
		            '   <div class="el-right">'+
		            '       <ul>';
		        $.each(thisdata.Brands[0].Models,function(i,v){
		            if(i==0){
		                html+='<li class="hover-li" typeId='+thistype+' brandId='+thisdata.Brands[0].BrandId+' modelId='+v.ModelId+'>'+v.ModelName+'</li>';
		            }else{
		                html+=' <li typeId='+thistype+' brandId='+thisdata.Brands[0].BrandId+' modelId='+v.ModelId+'>'+v.ModelName+'</li>';
		            }
		        });
		        html+=  '       </ul>'+
		            '   </div>'+
		            '</div>';
		        var obj=$('.equipment-list');
		        if(!obj[0]){
		            $('body').append(html);
		            obj=$('.equipment-list');
		            $('.el-left').on('click',"li",function(){
		                var index= $(this).index();
		                $('.el-left li').removeClass('hover-li');
		                $(this).addClass('hover-li');
		                erji_fn(index,thisdata,thistype);
		            })
		            $('.el-right').on('click',"li",function(){
		                $('.el-right li').removeClass('hover-li');
		                $(this).addClass('hover-li');
		                opt.callback($('.el-left li').html()+" "+$('.el-right .hover-li').html(),$('.el-right .hover-li').attr("brandId"),$('.el-right .hover-li').attr("modelId"),$('.el-right .hover-li').attr("typeId"));
		                setTimeout(function() {
		                	$(".equipment-list").remove();
		                	$(".selectMyCarDiv").remove(); 
		                	
		                },500)
		                 
		            })
		        }else{
		            obj.show();
		        }	
	        }
        
	        function inBtnClick(thisEvent){
	        	var index = thisEvent.attr("id");
		   		$(".selectMyCarDiv > button").each(function(i,v) {
		   				$(this).removeClass("selectdMyCarBtnClass")
		   			})
		   		thisEvent.addClass("selectdMyCarBtnClass")
		   		if ($(".equipment-list").length >　0) {
		   			$(".equipment-list").remove();
		   			if (index == "LoaderCar") {
		   				createList(type1Data,1)
		   			}else{
		   				createList(type2Data,2)
		   			}
		   			
		   		} else{
		   			createList(type1Data,1)
		   		}
		   	}
		   	
	        function erji_fn(index,data,thistype){
	            var html='';
	            $.each(data.Brands[index].Models,function(i,v){
	                if(i==0){
	                    html+='<li class="hover-li" typeId='+thistype+' brandId='+data.Brands[0].BrandId+' modelId='+v.ModelId+'>'+v.ModelName+'</li>';
	                }else{
	                    html+=' <li typeId='+thistype+' brandId='+data.Brands[0].BrandId+' modelId='+v.ModelId+'>'+v.ModelName+'</li>';
	                }
	            });
	            $('.el-right ul').html(html);
	        }
	    }
	}
	
	function showInfo(currentHours,totalHours){
	    
		var html = '<div class="thing">' +
            '<div class="right">' +
                '<div class="right-left">' +
                    '<input type="text" id="currentHour" value="'+currentHours+'" class="put">' +
                '</div>' + 
                '<div class="clear">' + '</div>' +
            '</div>' +
            '<div class="left">当前小时数' + '</div>' +
            '<div class="clear">' + '</div>' +
        '</div>'+
        '<div class="thing thing-last">' +
            '<div class="right">' +
                '<div class="right-left">' +
                    '<input type="text" id="totalHour" value="'+totalHours+'" class="put">' +
                '</div>' + 
                '<div class="clear">' + '</div>' +
            '</div>' +
            '<div class="left">累计小时数' + '</div>' +
            '<div class="clear">' + '</div>' +
        '</div>';
        $(".thing:last").removeClass("thing-last");
        $(html).appendTo("#main1");
	}
	
	$(".button button").click(function() {
		submitCarInfo ()
	})
	
	function submitCarInfo () {
		
		var buyhour = $("#buyHour").eq(0).val()
		var buyData = $("#buyData").eq(0).val()
		var brandId = $('#shebei').attr("brandId")
    	var modelId = $('#shebei').attr("modelId")
    	var typeId = $('#shebei').attr("typeId")
		if (!typeId||!brandId||!modelId||!buyhour||!buyData) {
			alert("信息不完整")
			return
		}else{
			if (!$("#currentHour").eq(0).val()) {
				showInfo(10000,3000)
			}	
		}
		sleep(0.5)
		var currentHour = $("#currentHour").eq(0).val()
		var totalhour = $("#totalHour").eq(0).val()
		if (!typeId||!brandId||!modelId||!totalhour||!buyhour||!buyData||!currentHour) {
			alert("信息不完整")
			return
		}
		
		var submitData = 
	       {
	       		"Equipment":
						{
						WeiXinOpenID:22222222,
						VehicleType:typeId,
						BrandId:brandId,
						ModelId:modelId,
						PurchaseDate:buyData,
						BuyHours:buyhour,
						RegistrationHours:totalhour
						}
	       }
	    submitData = JSON.stringify(submitData)
	    function mysuccess(){
	    	$("input").attr("readonly","readonly");
	        $('#shebei').unbind()
	        $(".button .msg").css("display","none");
	        $(".button button").text("绑定司机")
	        $(".button button").unbind()
	        $(".button button").click(function() {
				bindDrivers()
			})
	    }
	    
	    function myerror(){
	    	alert("提交失败，请重试")
	    }
	    
	    CreateEquipment(submitData,mysuccess,myerror)
	}
	
	function bindDrivers() {
		var html = '<div class="driversDiv" >' + 
		'<div class="selectDriversDiv">' +
			'<input class="personalInfoTitleLeft SMSInput" value="请输入手机号查询"/>' +
			'<button class="SMSclick">查询</button>'+
		'</div>' +
		'<div class="button">' + 
        '<button id="bindDriver">绑定</button>'+
    '</div>' +
		'</div>';
		$("body").append(html)
		
		$(".selectDriversDiv .personalInfoTitleLeft").focus(function() {
			$(this).val("")
		})
		$(".selectDriversDiv .personalInfoTitleLeft").blur(function() {
			if (!$(this).val()) {
				$(this).val("请输入手机号查询")
			}
		})
		$(".selectDriversDiv .SMSclick").click(function() {
			$("#personalInfo").remove();
			$("#workInfo").remove();
			findDriverByPhone();	
		})		
		
	}
	
	function findDriverByPhone() {
		var phoneNum = $(".selectDriversDiv .personalInfoTitleLeft").attr("value")
		var info = 
		{
			ContactsQuery:
				{
				MobilePhone:phoneNum
				}
		}
		info = JSON.stringify(info);
		function mysus(thedata){
			console.log("thedata")
			console.log(thedata.Drivers)
			if (thedata.Drivers) {
				queryDrivers(thedata)
				var name = thedata.Drivers[0].ContactName
				var phoneNum = thedata.Drivers[0].MobilePhone
				var ContactId = thedata.Drivers[0].ContactId
				var EquipmentId = $('#shebei').attr("modelId")
				$(".button #bindDriver").click(function(){
					bindDriverToServer(EquipmentId,ContactId,name,phoneNum)
				})
			}else{
				$(".button #bindDriver").unbind()
				alert("当前手机号没有绑定司机")
			}
		}
		function myerror(thedata) {
			$(".button #bindDriver").unbind()
			alert("数据错误")
		}
		
		if (!phoneNum||isNaN(phoneNum)) {
			alert("手机号不能为空")
			console.log("手机号不能为空"+phoneNum)
		} else{
			RetrieveMultipleDrivers(info,mysus,myerror)
		}
	}
	
	function bindDriverToServer(EquipmentId,ContactId,name,phoneNum) {
		var startdate = $("#driverStartDate").val();
		var workTime = $("#driverWorkTime").val();
		if (!EquipmentId||!ContactId||!startdate||!workTime) {
			alert("信息不完整")
			return
		}
		var driverInfo = {
			"EquipmentDriver":
				{
				"EquipmentId":EquipmentId,
				"DriverId":ContactId,
				"EmploymentStartDate":startdate,
				"ServiceHours":workTime
				}
		}
		driverInfo = JSON.stringify(driverInfo)
		CreateEquipmentDriver(driverInfo,success,myerror)
		function success () {
			if (!$("#showDriver .bindInfo .bindLeftInfo").eq(0).text()){
				$("#showDriver").css("display","block")
				var thistext = name +"  "+ phoneNum
				$("#showDriver .bindInfo .bindLeftInfo").eq(0).text(thistext)
				freeBindEvent ()
			}else{
				$("#showDriver .bindInfo").eq(0).clone().appendTo($("#showDriver"))
				var thistext = name +"  "+ phoneNum
				$("#showDriver .bindInfo .bindLeftInfo").eq(0).text(thistext)
				freeBindEvent()
			}
			$(".driversDiv").remove();
		}
		
		function myerror () {
			alert("服务器错误，请稍后重试")
		}
	}
	
	function freeBindEvent () {
		$(".freeBind").unbind()
		$(".freeBind").each(function() {
			$(this).click(function() {
				if ($(".freeBind").length <= 1) {
					$("#showDriver .bindInfo .bindLeftInfo").eq(0).text("")
					$("#showDriver").css("display","none")
				}else{
					$(this).parent(".bindInfo").remove()
				}
			})
		})
	}
	
	function sleep(n) {
	    var start = new Date().getTime();
	    while(true)  if(new Date().getTime()-start > n) break;
    }
	
	function queryDrivers(thisdata) {
		var name = thisdata.Drivers[0].ContactName
		var phoneNum = thisdata.Drivers[0].MobilePhone
		var myDate = new Date(); 
		var startDate = myDate.toLocaleDateString()
		var workTime = 0;
		var html1 = '<div id="personalInfo" class="mainDriver">' +
		'<div class="thing">' +
            '<div class="right">' +
                '<div class="right-left">' +
                    '<input type="text" value="'+name+'" class="put">' +
                '</div>' + 
                '<div class="clear">' + '</div>' +
            '</div>' +
            '<div class="left">姓名' + '</div>' +
            '<div class="clear">' + '</div>' +
        '</div>'+
        '<div class="thing thing-last">' +
            '<div class="right">' +
                '<div class="right-left">' +
                    '<input type="text"  value="'+phoneNum+'" class="put">' +
                '</div>' + 
                '<div class="clear">' + '</div>' +
            '</div>' +
            '<div class="left">联系电话' + '</div>' +
            '<div class="clear">' + '</div>' +
        '</div>' + '</div>';
        
        var html2 = '<div id="workInfo" class="mainDriver">' +
		'<div class="thing">' +
            '<div class="right">' +
                '<div class="right-left">' +
                    '<input type="date" id="driverStartDate" value="'+startDate+'" class="put">' +
                '</div>' + 
                '<div class="clear">' + '</div>' +
            '</div>' +
            '<div class="left">雇佣开始时间' + '</div>' +
            '<div class="clear">' + '</div>' +
        '</div>'+
        '<div class="thing thing-last">' +
            '<div class="right">' +
                '<div class="right-left">' +
                    '<input type="text" id="driverWorkTime" value="'+workTime+'" class="put">' +
                '</div>' + 
                '<div class="clear">' + '</div>' +
            '</div>' +
            '<div class="left">已为我工作小时数' + '</div>' +
            '<div class="clear">' + '</div>' +
        '</div>' + '</div>';
        var ohtml = html1 + html2;
        $(".driversDiv").append(ohtml);
	}

})
