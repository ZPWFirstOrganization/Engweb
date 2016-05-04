var appID = 'wx2ff0552251b21515';
var person = new Object();
var programs = [];
var docs = [];
var smsCode = ""
//司机类型 1 表示挖掘机 2 表示装载机
var driverType = 1
$(function(){
	// wx.config({
	//     debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
	//     appId: '', // 必填，公众号的唯一标识
	//     timestamp: , // 必填，生成签名的时间戳
	//     nonceStr: '', // 必填，生成签名的随机串
	//     signature: '',// 必填，签名，见附录1
	//     jsApiList: [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	// });
	// $(document).ready(function(){
		
	// })
	// var access_code=$.getUrlParam('code');
	// if (access_code){
	// 	GetWeiXinUserInfo('{"Code":'+access_code+'}',function(res){
	// 		initLayout();
	// 	},function(res){

	// 	})
	// }else{
	// 	var fromurl=location.href;
 //        var url='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+appID+'&redirect_uri='+encodeURIComponent(fromurl)+'&response_type=code&scope=snsapi_base&state=STATE%23wechat_redirect&connect_redirect=1#wechat_redirect';
 //        location.href=url;
	// }
	//alert("CODE:"+$.getUrlParam('code'))
	if(!sessionStorage.getItem('openID')){
		GetWeiXinUserInfo('{"WeiXinCode":{"Code":'+$.getUrlParam('code')+'}}',function(res){
			if(res.UserInfo.openid){
				sessionStorage.setItem('openID',res.UserInfo.openid)
			}
			initLayout();
		},function(res){

		})
	}else{
		initLayout();
	}
	
	// initLayout();
	//console.log($("#TimeArea1 div div .put"));
})

function initLayout(){
	var isCarPop = false
	$('#shebei').click(function(){
		$(":input").blur();
		setTimeout(function () {
			if(!isCarPop){
				$("body").showLoading();
				$.choose({
					callback:function(v1,v2,v3,v4){
						isCarPop = true
						$("body").hideLoading();
						console.log(v1,v2,v3,v4)
						$('#shebei').val(v1);
						person.VehicleBrandId = v2;
						person.VehicleModelId = v3;
						driverType = v4;
						if(driverType == 1){
							$("[show=driver1]").css({"display":""});
							$("[show=driver2]").css({"display":"none"});
						}else{
							$("[show=driver2]").css({"display":""});
							$("[show=driver1]").css({"display":"none"});
						}
					}
				})
			}else{
            	$(".equipment-list").css({"display":"block"});
            	$(".selectMyCarDiv").css({"display":"block"});
			}
		},100)
	});
	// RetrieveSingleContact('{"Contact":{"WeiXinOpenID":"'+ sessionStorage.getItem('openID') +'"}}',
	RetrieveSingleContact('{"Contact":{"WeiXinOpenID":"'+ 10000 +'"}}',
	function(res){
		// alert(JSON.stringify(res))
		console.log("查询联系人:",res);
		//未查询到联系人
		if(res.ReturnValue == "未能查询到该联系人的详细信息!"){
			$("[name=special]").css({"display":"none"});
			$("[show=hasregisted]").css({"display":"none"});
			$("[show=regist]").css({"display":""});
			$("[show=master]").css({"display":""})
			$(".thing .wrapper .row .btn").click(function(e){
				var dom = $("#"+ this.id);
				if (dom.hasClass("positive")){
					$.each(programs, function(i,v){
						if(v == $(this).attr("index")){
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
					programs.push($(this).attr("index"));
					docs.push(dom);
				}
			})
		//查询到联系人
		}else{
			person = res;
			$("[show=hasregisted]").css({"display":""});
			$("[show=regist]").css({"display":"none"});
			$(".button button").text("修改资料");
			$(".button button").addClass("btnpositive");
			if (person.ContactType == 1){
				$("[show=master]").css({"display":""});
				var maps = ["ContactTypeName","ContactName","MobilePhone","","OwnerRepresent"];
				$("div[show=hasregisted]").each(function(i,v) {
					$(this).text(person[maps[i]]);
				})
				maps = ["ProjectType_GLQL","ProjectType_YLLH","ProjectType_CJFC","ProjectType_KSCJ","ProjectType_NLSL","ProjectType_Other"]
				$(".thing .wrapper .row .btn").each(function(i,v){
					if(person[maps[i]] == "true"){
						$(this).addClass("positive");
					};
				})
			}else{
				$("[show=driver]").css({"display":""});
				var maps = ["ContactTypeName","ContactName","MobilePhone","","DriverRepresent"];
				$("div[show=hasregisted]").each(function(i,v) {
					if(i != 3){
						$(this).text(person[maps[i]]);
					}else{
						$(this).text(person.VehicleBrandName+person.VehicleModelName);
					}
				})
			}
			$("#personIcon").attr("src","../"+person.PhotoUrl);
		}
	},function(res){
		// alert(JSON.stringify(res))
	})
	var type = 1
	var a = false
	if(a){
		// $("[show=hasregisted]").css({"display":""});
		// $("[show=regist]").css({"display":"none"});
		// $(".button button").text("修改资料")
		// $(".button button").addClass("btnpositive")
		// if (type == 1){
		// 	$("[show=master]").css({"display":""})
		// 	var maps = ["ContactTypeName","ContactName","MobilePhone","PhotoUrl","OwnerRepresent"];
		// 	$("div[show=hasregisted]").each(function(i,v) { 
		// 		this.text(person[maps[i]]);
		// 	})
		// }else{
		// 	$("[show=driver]").css({"display":""})
		// }
	}else{
		// $("[show=hasregisted]").css({"display":"none"});
		// $("[show=regist]").css({"display":""});
		// $("[show=master]").css({"display":""})
		// $(".thing .wrapper .row .btn").click(function(e){
		// 	var dom = $("#"+ this.id);
		// 	if (dom.hasClass("positive")){
		// 		$.each(programs, function(i,v){
		// 			if(v == $(this).attr("index")){
		// 				programs.splice(i,0);
		// 				docs.splice(i,0);
		// 			}
		// 		})
		// 		dom.removeClass("positive");
		// 	}else{
		// 		if (programs.length>=3){
		// 			programs.shift();
		// 			docs[0].removeClass("positive");
		// 			docs.shift();
		// 		}
		// 		dom.addClass("positive");
		// 		programs.push($(this).attr("index"));
		// 		docs.push(dom);
		// 	}
		// })
	}
	
}

function ruleSelect(e){
	if(e.value==1){
		$('#shebei').val("");
		$("[show=master]").css({"display":"block"})
		$("[show=driver]").css({"display":"none"})
		$("[show=driver1]").css({"display":"none"})
		$("[show=driver2]").css({"display":"none"})
		// $("#masterProgram").css({"display":"block"})
		// $("#TimeArea1").css({"display":"none"})
		// $("#TimeArea2").css({"display":"none"})
	}else{
		$("[show=master]").css({"display":"none"})
		$("[show=driver]").css({"display":"block"})
		// $("[show=driver1]").css({"display":"none"})
		// $("[show=driver2]").css({"display":"none"})
		// $("#masterProgram").css({"display":"none"})
		// $("#TimeArea1").css({"display":"block"})
		// $("#TimeArea2").css({"display":"block"})
	}
}

function getVerificationbtn(){
	if ($("#phone").val() == ""){
		alert("请先输入手机号码")
		return
	}
	if ($(".verificationbtn").text() != "获得验证码"){
		return;
	}
	$("body").showLoading();
	var time = 60;
	var interval;
	SendRegisterSMS('{"MobilePhone":'+$("#phone").val()+'}',function(res){
		$("body").hideLoading();
		console.log(res)
		if (res.VerificationCode){
			smsCode = res.VerificationCode;
		}
		interval = setInterval(function(){
			if (time > 0){
				$(".verificationbtn").text(time+"秒后重新获取");
				--time;
			}else{
				$(".verificationbtn").text("获得验证码");
				time = 60;
				window.clearInterval(interval);
			}
		},1000)
	},function(res){
		$("body").hideLoading();
		alert("网络不稳定，请稍后再试")
	})
	
	
}
$("#SMScode").on('input',function(e){ 
	if(smsCode != "" && smsCode == this.value){
		$(".button button").addClass("btnpositive");	
	}else{
		$(".button button").removeClass("btnpositive");	
	}
}); 


	

function picChange(e){
	var file = e.files[0];
	if(!/image\/\w+/.test(file.type)){
		alert("请确保文件为图像类型");
		return false;
	}
	var reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = function(e){
		$("#personIcon").attr("src",this.result);
		var _img = new Image();
		_img.src = this.result;
		_img.onload = function(){
			var _canvas = document.createElement("canvas")
			_canvas.width = _img.width;
	        _canvas.height = _img.height;
	        var _context = _canvas.getContext('2d');
	        _context.drawImage(_img,0,0);
	        person.PhotoBase64 = _canvas.toDataURL('image/jpeg',0.5);
		}	
	}
}

function checkSubmit(){
	var msg = "pass";
	if($("#name").val() == "") {
		msg = "请输入姓名";
	}else if($("#phone").val() == "") {
		msg = "请输入手机号码";
	}else if($("#driverCar").css("display") != "none" && $("#shebei").val() == "") {
		msg = "请选择设备";
	}else if($("#personDecription").val() == "") {
		msg = "请输入个人描述";
	// }else if($("#name").val() == "") {
	// 	msg = "";
	}
	return msg;
}
function bundleData(){
	// person.WeiXinOpenID = sessionStorage.getItem('openID');
	person.WeiXinOpenID = 10001;
	person.ContactName = $("#name").val();
	person.MobilePhone = $("#phone").val();
	person.ContactType = $("#ruleSelect").val();
	// person.PhotoRepresent = $("#isDaiyan").is(':checked');
	person.JoinCareerDate = $("#joinTime").val();
	person.OwnerRepresent = $("#personDecription").val();
	person.DriverRepresent = $("#personDecription").val();
	person.Birthday =  $("#birthday").val();
	if($("#ruleSelect").val() == 1){
		var maps = ["ProjectType_GLQL","ProjectType_YLLH","ProjectType_CJFC","ProjectType_KSCJ","ProjectType_NLSL","ProjectType_Other"]
		$.each(maps, function(i,v){
			person[v] = false;
		})
		$.each(maps, function(i1,v1){
			$.each(programs, function(i2,v2){
				if(i1 == v2){
					person[v1] = true;
				}
				// person[v1] = false;
			})
		})
	}else if($("#ruleSelect").val() == 2 && driverType == 1) {
		var maps = ["Grab_WG","Grab_ZP","Grab_SP","Grab_ZC","Grab_SD","Grab_LH","Grab_HD","Grab_PS","Grab_CL","Grab_Other"]
		$("#TimeArea1 div div .put").each(function (i, v) {
			person[maps[i]] = parseInt(v.value);
		})
	}else if($("#ruleSelect").val() == 2 && driverType == 2) {
		var maps = ["Loader_TSZC","Loader_KSZC","Loader_JBZZL","Loader_Other"]
		$("#TimeArea2 div div .put").each(function (i, v) {
			person[maps[i]] = parseInt(v.value);
		})
	}
	console.log(person)
}
function submit(){
	if(!$(".button button").hasClass("btnpositive")){
		// self.location = 'personInfoUpdate.html'
		return;
	}
	if($(".button button").text() == "修改资料"){
		self.location = 'personInfoUpdate.html';
		return;
	}
	var msg = checkSubmit();
	if (msg != "pass"){
		alert(msg);
		return;
	}
	bundleData();
	$("body").showLoading();
	CreateContact('{"Contact":{'+JSON.stringify(person)+'}}',function(res){
		$("body").hideLoading();
		console.log("suc:",res)
		if(res.ReturnStatus = "E"){
			alert(res.ReturnValue)
			return;
		}
		window.location.reload();
	},function(res){
		$("body").hideLoading();
		alert("网络不稳定，请稍后再试")
	})
}

function programClick(e,id){
	// var dom = $("#"+ e.id);
	// if (dom.hasClass("positive")){
	// 	$.each(programs, function(i,v){
	// 		if(v == id){
	// 			programs.splice(i,0);
	// 			docs.splice(i,0);
	// 		}
	// 	})
	// 	dom.removeClass("positive");
	// }else{
	// 	if (programs.length>=3){
	// 		programs.shift();
	// 		docs[0].removeClass("positive");
	// 		docs.shift();
	// 	}
	// 	dom.addClass("positive");
	// 	programs.push(id);
	// 	docs.push(dom);
	// }
}
