$(function(){
	
})

function getVerificationbtn(){
	if ($(".verificationbtn").text() != "获得验证码"){
		return;
	}
	var time = 60;
	var interval = setInterval(function(){
		if (time > 0){
			$(".verificationbtn").text(time+"秒后重新获取");
			--time;
		}else{
			$(".verificationbtn").text("获得验证码");
			time = 60;
			window.clearInterval(interval)
		}
	},1000)
	
}

function picChange(e){
	var file = e.files[0];
	if(!/image\/\w+/.test(file.type)){
		alert("请确保文件为图像类型");
		return false;
	}
	var reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = function(e){
		//$("#personIcon").src(this.result)
		$("#personIcon").attr("src",this.result);
		//img_area.innerHTML = '<div class="sitetip">图片img标签展示：</div><img src="'+this.result+'" alt="" style="width:100px;height:100px"/>';
	}
	//$("#personIcon").src("")
}

function checkSubmit(){
	return msg;
}

function submit(){
	
}

function initLayout(){

}
var programs = [];
var docs = [];
function programClick(e,id){
	var dom = $("#"+ e.id);
	if (dom.hasClass("positive")){
		$.each(programs, function(i,v){
			if(v == id){
				programs.splice(i,0);
				docs.splice(i,0);
			}
		})
		dom.removeClass("positive");
	}else{
		if (programs.length>=3){
			programs.shift();
			docs[0].removeClass("positive");
			docs.shift();
		}
		dom.addClass("positive");
		programs.push(id);
		docs.push(dom);
	}
}