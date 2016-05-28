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
		    	var mhtml= 
		    	'<div class="selectMyCarDiv">' +
			    	'<button id="LoaderCar" class="selectdMyCarBtnClass selectMycarBtn selectMycarBtnLeft" style="margin-left: 30%;">挖掘机</button>' +
			    	'<button id="excavatingCar" class="selectMycarBtn selectMycarBtnRight" style="margin-right: 30%;">装载机</button>' +
		    	'</div>'
		    	
			    $('body').append(mhtml);
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
			                opt.callback($('.el-left .hover-li').html()+" "+$('.el-right .hover-li').html(),$('.el-right .hover-li').attr("brandId"),$('.el-right .hover-li').attr("modelId"),$('.el-right .hover-li').attr("typeId"));
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
		                    html+='<li class="hover-li" typeId='+thistype+' brandId='+data.Brands[index].BrandId+' modelId='+v.ModelId+'>'+v.ModelName+'</li>';
		                }else{
		                    html+=' <li typeId='+thistype+' brandId='+data.Brands[index].BrandId+' modelId='+v.ModelId+'>'+v.ModelName+'</li>';
		                }
		            });
		            $('.el-right ul').html(html);
		        }
		    }
		}
	
	$.check=function(thisEquipmentId) {
		var equipmentData = 
		    			{
		       		"Equipment":
							{
							"EquipmentId":thisEquipmentId
							}
		       		}
    		equipmentData = JSON.stringify(equipmentData)
    		RetrieveSingleEquipment(equipmentData,checkSuc,checkErr)
    		sessionStorage.setItem('currentEquipmentId',null)
		
		function checkSuc(data) {
			console.log(data)
			$('#shebei').val(data.BrandName + data.ModelName)
			$('#shebei').unbind()
			$('#shebei').attr("EquipmentId",data.EquipmentId)
			var nowdate = data.PurchaseDate.split("-");
			$("#buyData").val(nowdate[0]+"-"+nowdate[1])
			$('#buyData').unbind()
			$("#buyHour").val(data.BuyHours)
			$('#buyHour').unbind()
			$("#inputHour").val(data.RegistrationHours)
			$('#inputHour').unbind()
			showInfo(data.BuyHours,data.RegistrationHours)
			if (data&&data.EquipmentDrivers&&data.EquipmentDrivers.length > 0) {
	        		for (var i = 0; i < data.EquipmentDrivers.length; i++) {
		        		inputDriverInfo(data.EquipmentDrivers[i].DriverName,data.EquipmentDrivers[i].DriverPhone,data.EquipmentDrivers[i].EquipmentDriverId)
		        }
	        }
			doFuncAfterSubmit(data.EquipmentId)
		}
		
		function checkErr (msg) {
			console.log(msg)
			alert("数据获取失败,请重试!")
			window.location.href = "myCars.html"
		}
	}
	
	function submitCarInfo () {
		
		var buyhour = $("#buyHour").eq(0).val()
		var buyData = $("#buyData").eq(0).val()
		var inputHour = $("#inputHour").eq(0).val()
		var brandId = $('#shebei').attr("brandId")
	    	var modelId = $('#shebei').attr("modelId")
	    	var typeId = $('#shebei').attr("typeId")
		if (!typeId||!brandId||!modelId||!buyhour||!buyData) {
			alert("信息不完整")
			return
		}
		
		sleep(0.5)
//		var currentHour = $("#currentHour").eq(0).val()
//		var totalhour = $("#totalHour").eq(0).val()
		if (!typeId||!brandId||!modelId||!buyhour||!buyData) {
			alert("信息不完整")
			return
		}
		buyData=buyData.replace("/","-");
		var myOpenId = sessionStorage.getItem('openID');
//		var myOpenId = "o_3jVt-TNytKWeN_6UDnLhktknYo";
		if (!myOpenId) {
			alert("微信发生错误,请稍后再试.")
			console.log("没有取到openID")
			return
		}
		var submitData = 
	       {
	       		"Equipment":
						{
						WeiXinOpenID:myOpenId,
						VehicleType:typeId,
						BrandId:brandId,
						ModelId:modelId,
						PurchaseDate:buyData,
						BuyHours:buyhour,
						RegistrationHours:inputHour
						}
	       }
	    submitData = JSON.stringify(submitData)
	    function mysuccess(data){
			console.log("%o",data);
			if (data&&data.ReturnStatus == "E") {
				alert(data.ReturnValue)
				return
			}
		    	if (data) {
		    		var equipmentData = 
		    			{
		       		"Equipment":
							{
							"EquipmentId":data.EquipmentId
							}
		       	}
		    		$('#shebei').attr("EquipmentId",data.EquipmentId)
		    		
		    		equipmentData = JSON.stringify(equipmentData)
		    		RetrieveSingleEquipment(equipmentData,infoSuc,infoErr)
		    		
		    		function infoSuc (data) {
		    			if (!$("#currentHour").eq(0).val()) {
							showInfo(data.BuyHours,data.RegistrationHours)
						}
		    			doFuncAfterSubmit(data.EquipmentId)
		    		}
		    		
		    		function infoErr () {
		    			doFuncAfterSubmit()
		    		}
		    		
		    	}
	    }
	    
	    function myerror(){
	    	alert("提交失败，请重试")
	    }
	    
	    CreateEquipment(submitData,mysuccess,myerror)
	}
	
	function doFuncAfterSubmit(EquipmentId) {
		$("input").attr("readonly","readonly");
        $('#shebei').unbind()
        $(".button .msg").css("display","none");
        $("#myDelectBtn").css("display","block");
        if (EquipmentId) {
        		$("#myDelectBtn").click(function() {
        			var msg = confirm("确定要删除这台设备吗?")
        			if (msg) {
        				removeEquipment(EquipmentId)
        			}
        		})
        }
        $(".button button").text("绑定司机")
        $(".button button").unbind()
        $(".button button").click(function() {
			bindDrivers()
		})
	}
	
	function removeEquipment(EquipmentId) {
		var thisdata = 
		{
			"Equipment":
			{
			"EquipmentId":EquipmentId
			}
		}
		thisdata = JSON.stringify(thisdata)
		function suc () {
			window.location.href = "myCars.html"
		}
		
		function err () {
			alert("删除失败")
		}
		
		DisableEquipment(thisdata,suc,err)
	}
	
	function bindDrivers() {
		var html = '<div class="driversDiv" >' + 
		'<div class="selectDriversDiv">' +
			'<input type="tel" style＝"-webkit-appearance：none" class="personalInfoTitleLeft SMSInput" value="请输入手机号查询"/>' +
			'<button class="SMSclick">查询</button>'+
		'</div>' +
		'<div class="button" style="position:absolute;">' + 
        '<button id="bindDriver">绑定</button>'+'<button id="unbindDriver">取消</button>'+
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
		$(".button #unbindDriver").click(function(){
			$(".driversDiv").remove();
				})
		$(".selectDriversDiv .SMSclick").click(function() {
			$("#personalInfo").remove();
			$("#workInfo").remove();
			findDriverByPhone();	
		})		
		
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
            '<div class="left">累计服务小时数' + '</div>' +
            '<div class="clear">' + '</div>' +
        '</div>';
        $(".thing:last").removeClass("thing-last");
        $(html).appendTo("#main1");
	}
	
	$(".button button").click(function() {
		submitCarInfo ()
	})
	
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
				var EquipmentId = $('#shebei').attr("EquipmentId")
				$(".button #bindDriver").click(function(){
					bindDriverToServer(EquipmentId,ContactId,name,phoneNum)
				})
			}else{
				$(".button #bindDriver").unbind()
				alert("当前手机号没有匹配的司机")
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
		console.log(EquipmentId + "--" + ContactId + "--" + startdate + "--" + workTime + "--" )
		if (!EquipmentId||!ContactId||!startdate||!workTime) {
			if (!EquipmentId||!ContactId) {
				alert("网络原因导致信息获取失败,请回到首页并重试.")
			}else{
				alert("信息不完整")
			}
			return
		}
		startdate=startdate.replace("/","-");
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
		function success (data) {
			console.log(data + "--------------------司机绑定返回")
			inputDriverInfo(name,phoneNum,ContactId)
			$(".driversDiv").remove();
		}
		
		function myerror () {
			alert("服务器错误，请稍后重试")
		}
	}
	
	function inputDriverInfo (name,phoneNum,ContactId) {
			if (!$("#showDriver .bindInfo .bindLeftInfo #binDName").eq(0).text()){
				$("#showDriver").css("display","block")
				$("#showDriver .bindInfo .bindLeftInfo #binDName").eq(0).text(name)
				$("#showDriver .bindInfo .bindLeftInfo #binDPhone").eq(0).text(phoneNum)
				$("#showDriver .bindInfo .bindLeftInfo #binDPhone").eq(0).attr("driverId",ContactId)
				freeBindEvent ()
			}else{
				$("#showDriver .bindInfo").eq(0).clone().appendTo($("#showDriver"))
				$("#showDriver .bindInfo .bindLeftInfo #binDName").eq(0).text(name)
				$("#showDriver .bindInfo .bindLeftInfo #binDPhone").eq(0).text(phoneNum)
				$("#showDriver .bindInfo").eq(0).attr("driverId",ContactId)
				$("#showDriver .bindInfo .bindLeftInfo #binDPhone").eq(0).attr("driverId",ContactId)
				freeBindEvent()
			}
	}
	
	function freeBindEvent () {
		$(".freeBind").unbind()
		$(".freeBind").each(function() {
			$(this).click(function() {
				var msg = confirm("确定要解绑吗?")
        			if (msg) {
	        			var contactId = $(this).parent(".bindInfo").attr("driverId")
					var unbindData = 
					{
					"EquipmentDriver":
						{
						"EquipmentDriverId":contactId
						}
					}
					unbindData = JSON.stringify(unbindData)
					UnboundEquipmentDriver(unbindData,ubondSec,uBondErr)
					function ubondSec (data) {
						alert("删除成功")
					}
					
					function uBondErr () {
						alert("删除失败")
					}
					
					if ($(".freeBind").length <= 1) {
						$("#showDriver .bindInfo .bindLeftInfo #binDName").eq(0).text("")
						$("#showDriver").css("display","none")
					}else{
						$(this).parent(".bindInfo").remove()
					}
        			}
				
				
			})
		})
	}
	
	function sleep(n) {
	    var start = new Date().getTime();
	    while(true)  if(new Date().getTime()-start > n) break;
    }
	
	function GetQueryString(name) { 
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i"); 
		var r = window.location.search.substr(1).match(reg); 
		if (r!=null) return (r[2]); return null; 
		} 
		 
		var sname = GetQueryString("name"); 
		if(sname!=null) 
		{ 
		var sname_ = decodeURIComponent(sname); 
		alert(sname_); 
	}
	
	function queryDrivers(thisdata) {
		var name = thisdata.Drivers[0].ContactName
		var phoneNum = thisdata.Drivers[0].MobilePhone
		var myDate = new Date(); 
		var startDate = myDate.toLocaleDateString()
		startDate = startDate.replace(/\//g,"-")
		startDate = startDate.replace(/-/,"-0")
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
            '<div class="right" style="margin-right:5px;">' +
                '<div class="right-left">' +
                    '<input type="date" id="driverStartDate" value="'+startDate+'" style="margin-right:20px;" class="put">' +
                '</div>' + 
                '<div class="clear">' + '</div>' +
            '</div>' +
            '<div class="left">雇佣开始时间' + '</div>' +
            '<div class="clear">' + '</div>' +
        '</div>'+
        '<div class="thing thing-last">' +
            '<div class="right">' +
                '<div class="right-left">' +
                    '<input type="tel" id="driverWorkTime" value="'+workTime+'" class="put">' +
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
