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
                	console.log("111111111111111111111");
                    console.log(msg);
                }
            });
        }
    var data = {
    	root : ["品牌1","品牌2","品牌3","品牌4","品牌5","品牌6"],
    	root_data : [["车辆11","车辆12","车辆13","车辆14","车辆15","车辆16"],["车辆21","车辆22","车辆23","车辆24","车辆25","车辆26"],["车辆31","车辆32","车辆33","车辆34","车辆35","车辆36"],["车辆41","车辆42","车辆43","车辆44","车辆45","车辆46"],["车辆51","车辆52","车辆53","车辆54","车辆55","车辆56","车辆57","车辆58"],["车辆51","车辆52","车辆53","车辆54","车辆55","车辆56","车辆57","车辆58"]]
    }
    window.choose_data=data;
    createUI ()
    function createUI () {
    	var html= '<div class="equipment-list">'+
            ' <div class="el-left">'+
            '   <ul>';
        $.each(window.choose_data.root,function(i,v){
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
        $.each(window.choose_data.root_data[0],function(i,v){
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
                erji_fn(index);
            })
            $('.el-right li').live('click',function(){
                $('.el-right li').removeClass('hover-li');
                $(this).addClass('hover-li');
                obj.hide();
                opt.callback($('.el-left li').html()+" "+$('.el-right .hover-li').html());
            })
        }else{
            obj.show();
        }
        function erji_fn(index){
            var html='';
            $.each(window.choose_data.root_data[index],function(i,v){
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
