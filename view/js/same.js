$(function(){
	showNav();
	function showNav(){
		var urlString = window.location.href;
		urlString = urlString.split(".html")[0];
		urlString = urlString.split("rongmingye.xin/")[1];
		urlString = urlString.toString();

		var navLi = $(".top-nav li");
		if(urlString == "index"|| urlString==""){ navLi.eq(0).addClass("liActive").siblings().remove("liActive"); }
		else if(urlString == "article"){ navLi.eq(1).addClass("liActive").siblings().remove("liActive");}
		else if(urlString == "diary"){ navLi.eq(2).addClass("liActive").siblings().remove("liActive");}
		else if(urlString == "about"){ navLi.eq(3).addClass("liActive").siblings().remove("liActive");}
		else if(urlString == "board"){ navLi.eq(4).addClass("liActive").siblings().remove("liActive");}
		else if(urlString == "showArticle"){ navLi.eq(1).addClass("liActive").siblings().remove("liActive");}
	}

});