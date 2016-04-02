/**
 * Created by chaos on 2016/3/1.
 */
$(function(){
    $.choose=function(opt){
        if(!window.choose_data){
            $.ajax({
                type: "GET",
                url: 'php/data.php',
                data:{},
                timeout:5000,
                async:true,
                dataType:'jsonp',
                success: function(data){
                	data = JSON.stringify(data);
                	console.log(data);
                	data = JSON.stringify(data);
                	
                    window.choose_data=data.data;
                    console.log(data.data);
                    //createUI ()
                },
                error:function(msg){
/*                	console.log("111111111111111111111");
                    console.log(msg);*/
                }
            });
        }
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
	            $('.el-left li').live('click',function(){
	                var index= $(this).index();
	                $('.el-left li').removeClass('hover-li');
	                $(this).addClass('hover-li');
	                erji_fn(index,data2);
	            })
	            $('.el-right li').live('click',function(){
	                $('.el-right li').removeClass('hover-li');
	                $(this).addClass('hover-li');
	                opt.callback($('.el-left li').html()+" "+$('.el-right .hover-li').html());
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
	
	function submit(currentHours,totalHours){
		var html = '<div class="thing">' +
            '<div class="right">' +
                '<div class="right-left">' +
                    '<input type="text" value="'+currentHours+'" class="put">' +
                '</div>' + 
                '<div class="clear">' + '</div>' +
            '</div>' +
            '<div class="left">当前小时数' + '</div>' +
            '<div class="clear">' + '</div>' +
        '</div>'+
        '<div class="thing thing-last">' +
            '<div class="right">' +
                '<div class="right-left">' +
                    '<input type="text" value="'+totalHours+'" class="put">' +
                '</div>' + 
                '<div class="clear">' + '</div>' +
            '</div>' +
            '<div class="left">累计小时数' + '</div>' +
            '<div class="clear">' + '</div>' +
        '</div>';
        $(".thing:last").removeClass("thing-last");
        $(html).appendTo("#main1");
        $("input").attr("readonly","readonly");
        $('#shebei').unbind()
        $(".button .msg").css("display","none");
        $(".button button").text("绑定司机")
        $(".button button").unbind()
        $(".button button").click(function() {
			bindDrivers()
		})
	}
	
	$(".button button").click(function() {
		submit(10000,3000)
	})

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
			queryDrivers()
		})
		
		$(".button #bindDriver").click(function(){
			if (!$("#showDriver .bindInfo .bindLeftInfo").eq(0).text()){
				$("#showDriver").css("display","block")
				var thistext = "李四 1333333333"
				$("#showDriver .bindInfo .bindLeftInfo").eq(0).text(thistext)
				freeBindEvent ()
			}else{
				$("#showDriver .bindInfo").eq(0).clone().appendTo($("#showDriver"))
				var thistext = "李四 1333333333"
				$("#showDriver .bindInfo .bindLeftInfo").eq(0).text(thistext)
				freeBindEvent ()
			}
			$(".driversDiv").remove();
		})
		
		
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
	
	function queryDrivers() {
		var name = "张三"
		var phoneNum = 13333333333;
		var startDate = "2015-10-10";
		var workTime = 1000;
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
                    '<input type="text" value="'+phoneNum+'" class="put">' +
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
                    '<input type="text" value="'+startDate+'" class="put">' +
                '</div>' + 
                '<div class="clear">' + '</div>' +
            '</div>' +
            '<div class="left">雇佣开始时间' + '</div>' +
            '<div class="clear">' + '</div>' +
        '</div>'+
        '<div class="thing thing-last">' +
            '<div class="right">' +
                '<div class="right-left">' +
                    '<input type="text" value="'+workTime+'" class="put">' +
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
