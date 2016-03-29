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

function getImage(){

}

function checkSubmit(){
	var msg = "pass";

	return msg;
}

function submit(){
	
}