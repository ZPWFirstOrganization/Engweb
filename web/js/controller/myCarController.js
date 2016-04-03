$(function(){
	for (var i = 0; i < 10; i++) {
		$('ul li:first-child div div').eq(0).text("小松"+ i);
		$('ul li:first-child div div').eq(1).text("张强"+ i);
		$('ul li:first-child .myCarInput').eq(0).text("正常作业");
		$('ul li:first-child .myCarInput').eq(1).text(i);
		$('ul li:first-child .myCarInput').eq(2).text(i);
		$('ul li:first-child .myCarInput').eq(3).text(i);
		$("ul li:first-child").clone(true).appendTo("ul");
	}
	$("<div style='height:50px;'></div>").appendTo("ul");
	$("ul li").each(function() {
		$(this).click(function() {
			alert("111")
			window.location.href=''
		})
	})
})
