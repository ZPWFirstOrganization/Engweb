var person = new Object();
var programs = [];
var docs = [];
var smsCode = ""
//司机类型 1 表示挖掘机 2 表示装载机
var driverType = 1
var isNewImg = false;
var imgIds = [];
var imgServerId = "";

$(function(){
	GetWeChatConfig('{"Request":{"PageUrl":"'+window.location.href+'"}}',
		function(res){
			wx.config({
			    debug: false, 
			    appId: res.ConfigInfo.AppId,
			    timestamp:res.ConfigInfo.Timestamp,
			    nonceStr: res.ConfigInfo.NonceStr,
			    signature: res.ConfigInfo.Signature,
			    jsApiList: ['chooseImage','previewImage','uploadImage']
			});
		},function(res){
			
	})
	initLayout();
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
	RetrieveSingleContact('{"Contact":{"WeiXinOpenID":"'+ sessionStorage.getItem('openID') +'"}}',
	function(res){
		console.log("查询联系人:",res);
		//未查询到联系人
		if(res.ReturnValue == "未能查询到该联系人的详细信息!"){
			// $("[name=special]").css({"display":"none"});
			// $("[show=hasregisted]").css({"display":"none"});
			// $("[show=regist]").css({"display":""});
			// $("[show=master]").css({"display":""})
		//查询到联系人
		}else{
			person = res;
			$("[show=hasregisted]").css({"display":""});
			$("[show=regist]").css({"display":"none"});
			// $(".button button").text("修改资料");
			// $(".button button").addClass("btnpositive");
			var rulOption = '';
			var maps = [];
			if (person.ContactType == 1){
				rulOption = '<option value="1" selected>机主</option><option value="2">司机</option>';
				$("[show=master]").css({"display":""});
				$("#personDecription").text(person.OwnerRepresent)
				maps = ["ProjectType_GLQL","ProjectType_YLLH","ProjectType_CJFC","ProjectType_KSCJ","ProjectType_NLSL","ProjectType_Other"]
				$(".thing .wrapper .row .btn").each(function(i,v){
					if(person[maps[i]] == "true"){
						$(this).addClass("positive");
						programs.push($(this).attr("index"))
						docs.push($(this));
					};
				})
			}else{
				rulOption = '<option value="1">机主</option><option value="2" selected>司机</option>';
				$("#driverCar").css({"display":""});
				$("#shebei").val(person.VehicleBrandName+person.VehicleModelName);
				$("#personDecription").val(person.DriverRepresent);
			}
			maps = ["ContactName","MobilePhone"];
			$("[action=update]").each(function(i,v){
				$(this).val(person[maps[i]])
			});
			$("#ruleSelect").append(rulOption);
			$("#isDaiyan").attr("checked",person.PhotoRepresent == "true")
			$("#personIcon").attr("src","../"+person.PhotoUrl);
		}
	},function(res){

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
		$("[show=driver1]").css({"display":"none"})
		$("[show=driver2]").css({"display":"none"})
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
	var time = 60;
	var interval;
	SendRegisterSMS('{"MobilePhone":'+$("#phone").val()+'}',function(res){
		console.log(res)
		interval = setInterval(function(){
			if (time > 0){
				$(".verificationbtn").text(time+"秒后重新获取");
				--time;
			}else{
				$(".verificationbtn").text("获得验证码");
				time = 60;
				window.clearInterval(interval)
			}
		},1000)
	},function(res){
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
	wx.chooseImage({
	    count: 1, // 默认9
	    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
	    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
	    success: function (res) {
	    	isNewImg = true;
	        imgIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
	        $("#personIcon").attr("src",imgIds[0]);
	    }
	});
	// var file = e.files[0];
	// if(!/image\/\w+/.test(file.type)){
	// 	alert("请确保文件为图像类型");
	// 	return false;
	// }
	// var reader = new FileReader();
	// reader.readAsDataURL(file);
	// reader.onload = function(e){
	// 	$("#personIcon").attr("src",this.result);
	// 	var _img = new Image();
	// 	_img.src = this.result;
	// 	_img.onload = function(){
	// 		// 将图像绘制到canvas上  
	// 		var _canvas = document.createElement("canvas")
	// 		_canvas.width = _img.width;
	//         _canvas.height = _img.height;
	//         var _context = _canvas.getContext('2d');
	//         _context.drawImage(_img,0,0);
	//         person.PhotoBase64 = _canvas.toDataURL('image/jpeg',0.5);
	// 	}
	// }
}

function upLoadImg(callback){
	if(isNewImg){
		wx.uploadImage({
		    localId: imgIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
		    isShowProgressTips: 0, // 默认为1，显示进度提示
		    success: function (res) {
		    	alert(JSON.stringify(res));
		        imgServerId = res.serverId; // 返回图片的服务器端ID
		        // $('#name').val(res.serverId);
		        return callback();
		    },
		    fail: function(){
		    	alert("网络异常，请稍后再试");
		    }
		});
	}else{
		return callback();
	}
}

function checkSubmit(){
	var msg = "pass";
	if($("#name").val() == "") {
		msg = "请输入姓名";
	// }else if($("#phone").val() == "") {
	// 	msg = "请输入手机号码";
	}else if($("#driverCar").css("display") != "none" && $("#shebei").val() == "") {
		msg = "请选择设备";
	}else if($("#personDecription").val() == "") {
		msg = "请输入个人描述";
	// }else if(imgServerId == "") {
	// 	msg = "请选择照片";
	}
	return msg;
}
function bundleData(){
	person.WeiXinOpenID = sessionStorage.getItem('openID');
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
	// if(!$(".button button").hasClass("btnpositive")){
	// 	return;
	// }
	var msg = checkSubmit();
	if (msg != "pass"){
		alert(msg);
		return;
	}
	bundleData();
	upLoadImg(function(){
		$("body").showLoading();
		UpdateContact('{"Contact":{'+JSON.stringify(person)+'}}',function(res){
			$("body").hideLoading();
			console.log("suc:",res)
			if(res.ReturnStatus == "E"){
				alert(res.ReturnValue)
			}
			self.location = 'personInfo.html'
		},function(res){
			$("body").hideLoading();
			console.log("err:",res)
		})
	})
}

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
