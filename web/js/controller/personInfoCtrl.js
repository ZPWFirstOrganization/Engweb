var person = new Object();
var programs = [];
var docs = [];
var smsCode = "2345"

$(function(){
	$(document).ready(function(){
		$('#shebei').click(function(){
			$.choose({
				callback:function(v){
					$('#shebei').text(v);
				}
			})
		});
	})

	initLayout();
	//console.log($("#TimeArea1 div div .put"));
})

function initLayout(){

	RetrieveSingleContact('{"Contact":{"WeiXinOpenID":"123123123"}}',
	function(res){
		console.log("查询联系人:",res);
		//未查询到联系人
		if(res.ReturnValue == "未查询到该联系人的详细信息"){
			$("[name$=special]").css({"display":"none"});

		//查询到联系人
		}else{
			var maps = ["ContactTypeName","ContactName","MobilePhone",]
			$("div[show=hasregisted]").each(function(i,v) { 
				
			})
		}
	},function(res){

	})
	var type = 1
	var a = false
	if(a){
		$("[show=hasregisted]").css({"display":""});
		$("[show=regist]").css({"display":"none"});
		if (type == 1){
			$("[show=master]").css({"display":""})

		}else{
			$("[show=driver]").css({"display":""})
		}
	}else{
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
	}
	
}

function ruleSelect(e){
	if(e.value==1){
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
	if ($("#phone").val() != ""){
		alert("请先输入手机号码")
		return
	}
	if ($(".verificationbtn").text() != "获得验证码"){
		return;
	}
	var time = 60;
	var interval;
	SendRegisterSMS('{"MobilePhone":'+$("#phone")+'}',function(res){
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
	console.log(this.value)
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
		alert(this.result)
		//$("#personIcon").src(this.result)
		$("#personIcon").attr("src",this.result);
		//img_area.innerHTML = '<div class="sitetip">图片img标签展示：</div><img src="'+this.result+'" alt="" style="width:100px;height:100px"/>';
	}
	//$("#personIcon").src("")
}

function checkSubmit(){
	var msg = "pass";
	if($("#name").val() == "") {
		msg = "";
	}else if($("#name").val() == "") {
		msg = "";
	}else if($("#name").val() == "") {
		msg = "";
	}else if($("#name").val() == "") {
		msg = "";
	}else if($("#name").val() == "") {
		msg = "";
	}
	return msg;
}
function bundleData(){
	person.WeiXinOpenID = "123123123";
	person.ContactName = $("#name").val();
	person.MobilePhone = $("#phone").val();
	person.ContactType = $("#ruleSelect").val();
	person.PhotoRepresent = $("#isDaiyan").is(':checked');
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
	}else if($("#ruleSelect").val() == 2) {
		var maps = ["Grab_WG","Grab_ZP","Grab_SP","Grab_ZC","Grab_SD","Grab_LH","Grab_HD","Grab_PS","Grab_CL","Grab_Other"]
		$("#TimeArea1 div div .put").each(function (i, v) {
			person[maps[i]] = v.value;
		})
	}
	console.log(person)
}
function submit(){
	bundleData();
	CreateContact('{"Contact":{'+JSON.stringify(person)+'}}',function(res){
		console.log("suc:",res)
		if(ReturnStatus = "E"){
			alert(ReturnValue)
		}
	},function(res){
		console.log("err:",res)
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