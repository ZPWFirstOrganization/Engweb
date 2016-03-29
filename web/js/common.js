/**
 * Created by chaos on 2016/3/1.
 */
$(function(){
    $.choose=function(opt){
        if(!window.choose_data){
            $.ajax({
                type: "POST",
                url: 'php/data.php',
                data:{},
                timeout:5000,
                async:false,
                dataType:'json',
                success: function(data){
                    window.choose_data=data.data;
                },
                error:function(a,b){
                    alert('发生错误');
                }
            });
        }
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
                opt.callback($('.el-right .hover-li').html());
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






})
