$(function(){
	for (var i = 0; i < 10; i++) {
		$('ul li:first-child div div').eq(0).text("小松"+ i);
		$('ul li:first-child .myCarInput').eq(0).text("2015-0"+ i);
		$('ul li:first-child .myCarInput').eq(1).text(i);
		$('ul li:first-child .myCarInput').eq(2).text(i);
		$('ul li:first-child .myCarInput').eq(3).text(i);
		$("ul li div button:first-child").click(function(){
			/*this.parent.css("display","none")*/
			//alert("222")
			//this.closest('li').css("display","none");
			$(this).parents("li:first").css("display","none")
		});
		$("ul li:first-child").clone(true).appendTo("ul");
	}
})
