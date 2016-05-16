
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
		var carType = 1;
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
	    /*var data = {
	    	root : ["品牌1","品牌2","品牌3","品牌4","品牌5","品牌6","品牌6","品牌6","品牌6","品牌6","品牌6","品牌6","品牌6","品牌6","品牌6","品牌6","品牌6","品牌6","品牌6","品牌6"],
	    	root_data : [["车辆11","车辆12","车辆13","车辆14","车辆15","车辆16"],["车辆21","车辆22","车辆23","车辆24","车辆25","车辆26"],["车辆31","车辆32","车辆33","车辆34","车辆35","车辆36"],["车辆41","车辆42","车辆43","车辆44","车辆45","车辆46"],["车辆51","车辆52","车辆53","车辆54","车辆55","车辆56","车辆57","车辆58"],["车辆51","车辆52","车辆53","车辆54","车辆55","车辆56","车辆57","车辆58"],["车辆51","车辆52","车辆53","车辆54","车辆55","车辆56","车辆57","车辆58"],["车辆51","车辆52","车辆53","车辆54","车辆55","车辆56","车辆57","车辆58"],["车辆51","车辆52","车辆53","车辆54","车辆55","车辆56","车辆57","车辆58"],["车辆51","车辆52","车辆53","车辆54","车辆55","车辆56","车辆57","车辆58"],["车辆51","车辆52","车辆53","车辆54","车辆55","车辆56","车辆57","车辆58"],["车辆51","车辆52","车辆53","车辆54","车辆55","车辆56","车辆57","车辆58"],["车辆51","车辆52","车辆53","车辆54","车辆55","车辆56","车辆57","车辆58"],["车辆51","车辆52","车辆53","车辆54","车辆55","车辆56","车辆57","车辆58"],["车辆51","车辆52","车辆53","车辆54","车辆55","车辆56","车辆57","车辆58"],["车辆51","车辆52","车辆53","车辆54","车辆55","车辆56","车辆57","车辆58"],["车辆51","车辆52","车辆53","车辆54","车辆55","车辆56","车辆57","车辆58"],["车辆51","车辆52","车辆53","车辆54","车辆55","车辆56","车辆57","车辆58"],["车辆51","车辆52","车辆53","车辆54","车辆55","车辆56","车辆57","车辆58"]]
	    }
	    var data1 = {
	    	root : ["品牌1","品牌2","品牌3","品牌4","品牌5","品牌6"],
	    	root_data : [["车辆11","车辆12","车辆13","车辆14","车辆15","车辆16"],["车辆21","车辆22","车辆23","车辆24","车辆25","车辆26"],["车辆31","车辆32","车辆33","车辆34","车辆35","车辆36"],["车辆41","车辆42","车辆43","车辆44","车辆45","车辆46"],["车辆51","车辆52","车辆53","车辆54","车辆55","车辆56","车辆57","车辆58"],["车辆51","车辆52","车辆53","车辆54","车辆55","车辆56","车辆57","车辆58"],["车辆51","车辆52","车辆53","车辆54","车辆55","车辆56","车辆57","车辆58"]]
	    }*/
	    /*window.choose_data=data;
	    window.choose_data1=data1;
	    selectCars()*/
	    function selectCars () {
    		$("body").hideLoading();
	    	var ohtml= 
	    	'<div class="selectMyCarDiv">' +
		    	'<button id="LoaderCar" class="selectdMyCarBtnClass selectMycarBtn selectMycarBtnLeft" style="margin-left: 30%;">挖掘机</button>' +
		    	'<button id="excavatingCar" class="selectMycarBtn selectMycarBtnRight" style="margin-right: 30%;">装载机</button>' +
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
	        function createList(thisdata) {
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
		                html+='<li class="hover-li" brandId='+thisdata.Brands[0].BrandId+' modelId='+v.ModelId+'>'+v.ModelName+'</li>';
		            }else{
		                html+=' <li brandId='+thisdata.Brands[0].BrandId+' modelId='+v.ModelId+'>'+v.ModelName+'</li>';
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
		                erji_fn(index,thisdata);
		            })
		            $('.el-right').on('click',"li",function(){
		                $('.el-right li').removeClass('hover-li');
		                $(this).addClass('hover-li');
		                opt.callback($('.el-left .hover-li').html()+" "+$('.el-right .hover-li').html(),$('.el-right .hover-li').attr("brandId"),$('.el-right .hover-li').attr("modelId"),carType);
		                setTimeout(function() {
		                	$(".equipment-list").css({"display":"none"});
		                	$(".selectMyCarDiv").css({"display":"none"});
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
		   				carType = 1;
		   				createList(type1Data)
		   			}else{
		   				carType = 2;
		   				createList(type2Data)
		   			}
		   			
		   		} else{
		   			carType = 1;
		   			createList(type1Data)
		   		}
		   	}
		   	
	        function erji_fn(index,data){
	            var html='';
	            $.each(data.Brands[index].Models,function(i,v){
	                if(i==0){
	                    html+='<li class="hover-li" brandId='+data.Brands[0].BrandId+' modelId='+v.ModelId+'>'+v.ModelName+'</li>';
	                }else{
	                    html+=' <li brandId='+data.Brands[0].BrandId+' modelId='+v.ModelId+'>'+v.ModelName+'</li>';
	                }
	            });
	            $('.el-right ul').html(html);
	        }
	    }
	}