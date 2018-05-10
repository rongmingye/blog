$(function(){

	// 分析url, 获取文章的id
	getRequest();
	function getRequest(){
		var str = location.search;
		if(str){
			var url = str.substr(1), arr = url.split('&'), request = {};
			for(var i=0; i<arr.length; i++){
				var key=arr[i].split('=')[0], val = arr[i].split('=')[1];
				request[key] = val;
			}
			var articleId = request.id;
		}
		getAjax(articleId);
	}

	// 根据文章的id, 请求该文章的数据
	function getAjax(articleId){
		$.ajax({
			url: "/showArticle_post",
			type: "post",
			contentType: "application/x-www-form-urlencoded;charset=utf8",
			data: "id="+articleId,
			dataType: "json",
			success: function(result){
				showArticle(result);
			},
			fail: function(err, statue){
				console.log(err)
			}
		});
	}
	
	// 获取到文章数据后，显示到页面
	function showArticle(result){
		// 获取日期格式
        result.time = result.time.split("T")[0];
        var arrTime = result.time.split("-");
        var date = parseInt(arrTime[2])+1;
        arrTime[2] = date;
        result.time = arrTime.join("-");

		$("#title").html(result.title);
		$('#content').html(result.content);
		$('#one-tip').html( "<span id='one-name'>"
							+result.author+"</span><span id='one-time'>"
							+result.time+"</span><span id='one-type'>"
							+result.type+"</span>");
	}

});