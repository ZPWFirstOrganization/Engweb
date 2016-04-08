/**
 * Created by chaos on 2016/3/1.
 */
$(function(){
    $.choose=function(opt){
    var data = {
    	root : ["品牌1","品牌2","品牌3","品牌4","品牌5","品牌6","品牌6","品牌6","品牌6","品牌6","品牌6","品牌6","品牌6","品牌6","品牌6","品牌6","品牌6","品牌6","品牌6","品牌6"],
    	root_data : [["车辆11","车辆12","车辆13","车辆14","车辆15","车辆16"],["车辆21","车辆22","车辆23","车辆24","车辆25","车辆26"],["车辆31","车辆32","车辆33","车辆34","车辆35","车辆36"],["车辆41","车辆42","车辆43","车辆44","车辆45","车辆46"],["车辆51","车辆52","车辆53","车辆54","车辆55","车辆56","车辆57","车辆58"],["车辆51","车辆52","车辆53","车辆54","车辆55","车辆56","车辆57","车辆58"],["车辆51","车辆52","车辆53","车辆54","车辆55","车辆56","车辆57","车辆58"],["车辆51","车辆52","车辆53","车辆54","车辆55","车辆56","车辆57","车辆58"],["车辆51","车辆52","车辆53","车辆54","车辆55","车辆56","车辆57","车辆58"],["车辆51","车辆52","车辆53","车辆54","车辆55","车辆56","车辆57","车辆58"],["车辆51","车辆52","车辆53","车辆54","车辆55","车辆56","车辆57","车辆58"],["车辆51","车辆52","车辆53","车辆54","车辆55","车辆56","车辆57","车辆58"],["车辆51","车辆52","车辆53","车辆54","车辆55","车辆56","车辆57","车辆58"],["车辆51","车辆52","车辆53","车辆54","车辆55","车辆56","车辆57","车辆58"],["车辆51","车辆52","车辆53","车辆54","车辆55","车辆56","车辆57","车辆58"],["车辆51","车辆52","车辆53","车辆54","车辆55","车辆56","车辆57","车辆58"],["车辆51","车辆52","车辆53","车辆54","车辆55","车辆56","车辆57","车辆58"],["车辆51","车辆52","车辆53","车辆54","车辆55","车辆56","车辆57","车辆58"],["车辆51","车辆52","车辆53","车辆54","车辆55","车辆56","车辆57","车辆58"]]
    }
    var data1 = {
    	root : ["品牌1","品牌2","品牌3","品牌4","品牌5","品牌6"],
    	root_data : [["车辆11","车辆12","车辆13","车辆14","车辆15","车辆16"],["车辆21","车辆22","车辆23","车辆24","车辆25","车辆26"],["车辆31","车辆32","车辆33","车辆34","车辆35","车辆36"],["车辆41","车辆42","车辆43","车辆44","车辆45","车辆46"],["车辆51","车辆52","车辆53","车辆54","车辆55","车辆56","车辆57","车辆58"],["车辆51","车辆52","车辆53","车辆54","车辆55","车辆56","车辆57","车辆58"],["车辆51","车辆52","车辆53","车辆54","车辆55","车辆56","车辆57","车辆58"]]
    }
    window.choose_data=data;
    window.choose_data1=data1;
    selectCars ()
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
        function createList(data1,data2) {
	        var html = '<div class="equipment-list">'+
	            ' <div class="el-left">'+
	            '   <ul>';
	        $.each(data1,function(i,v){
	            if(i==0){
	                html+='<li class="hover-li">'+v+'</li>';
	            }else{
	                html+=' <li>'+v+'</li>';
	            }
	        });
	        html+=  '       </ul>'+
	            '   </div>'+
	            '   <div class="el-right">'+
	            '       <ul>';
	        $.each(data2[0],function(i,v){
	            if(i==0){
	                html+='<li class="hover-li">'+v+'</li>';
	            }else{
	                html+=' <li>'+v+'</li>';
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
					erji_fn(index,data2);
				})
				$('.el-right').on('click',"li",function(){
					$('.el-right li').removeClass('hover-li');
					$(this).addClass('hover-li');
					opt.callback($('.el-left .hover-li').html()+" "+$('.el-right .hover-li').html());
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
	   				createList(window.choose_data.root,window.choose_data.root_data)
	   			} else{
	   				createList(window.choose_data1.root,window.choose_data1.root_data)
	   			}
	   			
	   		} else{
	   			createList(window.choose_data.root,window.choose_data.root_data)
	   		}
	   	}
	   	
        function erji_fn(index,data){
            var html='';
            $.each(data[index],function(i,v){
                if(i==0){
                    html+='<li class="hover-li">'+v+'</li>';
                }else{
                    html+=' <li>'+v+'</li>';
                }
            });
            $('.el-right ul').html(html);
        }
    }
    }

})
