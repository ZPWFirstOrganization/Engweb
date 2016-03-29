$(document).ready(function(){
  $("#testbtn").click(function(){
 	 //alert($("#myinput")[0].value);
 	 var phoneNumber = $("#myinput")[0].value
 	 inquirePNL (phoneNumber)
  });
});

function inquirePNL (myphone) {
	var phoneNumber = parseInt(myphone)
	alert(typeof(phoneNumber) + "  " + phoneNumber)
	if (!phoneNumber||typeof(phoneNumber) != "number"){
		phoneNumber = 18623106152
	} 
	var url = "http://tcc.taobao.com/cc/json/mobile_tel_segment.htm?tel=" + phoneNumber
	$.ajax({
        url: url,
        type: 'GET',
        dataType: 'JSONP',//here
        success: function (data) {
        	console.log(data);
        },
        error: function (response) {
        	console.log(response);
        }
    });
}


var image = '';

function selectImage(file){
	if(!file.files || !file.files[0]){
	return;
}

var reader = new FileReader();

reader.onload = function(evt){
	document.getElementById('image').src = evt.target.result;
	image = evt.target.result;
}

reader.readAsDataURL(file.files[0]);
}

function uploadImage(){

	$.ajax({

		type:'POST',

		 url: 'upload/api', 

		 data: {image: image},

		 async: false,

		 dataType: 'json',

	 success: function(data){

	if(data.success){

		alert('上传成功');

		}else{

		alert('上传失败');

		}

	},

	error: function(err){

		alert('网络故障');

	}

	});
}