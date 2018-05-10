$(function(){
	
	var article_temp = "<p><span class='article-id'>{id}</span>"
	            +"<span class='article-title'>{title}</span>"
				+"<span class='article-type'>{type}</span>"
				+"<span class='article-time'>{time}</span>"
				+"<span class='article-modify'>修改</span>"
				+"<span class='article-del'>删除</span></p>";

	var diary_temp = "<p><span class='diary-id'>{id}</span>"
					+"<span class='diary-time'>{time}</span>"
					+"<span class='diary-modify'>修改</span>"
					+"<span class='diary-del'>删除</span></p>";

	var board_temp = "<p><span class='board-id'>{id}</span>"
						+"<span class='board-name'>{name}</span>"
						+"<span class='board-time'>{time}</span>"
						+"<span class='board-del'>删除</span></p>"

	var requestType = "article"; // 请求类型

	request(); // 根据请求类型请求内容

	// 控制侧边样式
	$('#public-type li').eq(0).addClass("liActive").siblings().removeClass("liActive");
	$('#public-type li').click(function(e){
		var index = $(this).index();
		$('#public-type li').eq(index).addClass("liActive").siblings().removeClass("liActive");

		if(index == 0){
			requestType = "article"; request(); return;
		}else if(index== 1){
			requestType = "diary"; request(); return;
		}
		else if(index == 2){
			requestType = "board"; request(); return;
		}

	});

	// 请求
	function request(){
		if(requestType == "article"){ 
			$.ajax({
				url: "/manage_article_post",
				type: "post",
				data: null,
				contentType: "application/x-www-form-urlencoded",
			 	dataType: "json",
			 	success: function(result){
			 		showArticle(result);
			 	},
			 	fail: function(err, status){
			 		console.log(err);
			 	}
			});
		}
		else if(requestType == "diary"){
			$.ajax({
				url: "/manage_diary_post",
				type: "post",
				data: null,
				contentType: "application/x-www-form-urlencoded",
			 	dataType: "json",
			 	success: function(result){
			 		showDiary(result);
			 	},
			 	fail: function(err, status){
			 		console.log(err);
			 	}
			});
		}
		else if(requestType == "board"){
			$.ajax({
				url: "/manage_board_post",
				type: "post",
				data: null,
				contentType: "application/x-www-form-urlencoded",
			 	dataType: "json",
			 	success: function(result){
			 		showBoard(result);
			 	},
			 	fail: function(err, status){
			 		console.log(err);
			 	}
			});
		}
	}
	
	// 展示文章
	function showArticle(result){
		$('#content').html('');
		result.map(function(item, index){
			// 获取日期格式
			item.time = item.time.split("T")[0];
			var arrTime = item.time.split("-");
			var date = parseInt(arrTime[2])+1;
			arrTime[2] = date;
			item.time = arrTime.join("-");

			var _temp = article_temp.replace('{id}', item.id)
							.replace('{title}', item.title)
							.replace('{type}', item.type)
							.replace('{time}', item.time);
			$('#content').html($('#content').html() + _temp);
		});
		modifyArticle();
		delArticle();
	}

	// 展示日记
	function showDiary(result){
		$('#content').html('');
		result.map(function(item, index){
			// 获取日期格式
			item.time = item.time.split("T")[0];
			var arrTime = item.time.split("-");
			var date = parseInt(arrTime[2])+1;
			arrTime[2] = date;
			item.time = arrTime.join("-");

			var _temp = diary_temp.replace('{id}', item.id)
							.replace('{time}', item.time);

			$('#content').html($('#content').html() + _temp);	
		});
		modifyDiary();
		delDiary();
	}

	// 展示留言
	function showBoard(result){
		$('#content').html('');
		result.map(function(item, index){

			// 获取日期格式
			item.time = item.time.split("T")[0];
			var arrTime = item.time.split("-");
			var date = parseInt(arrTime[2])+1;
			arrTime[2] = date;
			item.time = arrTime.join("-");

			var _temp = board_temp.replace('{id}', item.id)
							.replace('{name}', item.name)
							.replace('{time}', item.time);

			$('#content').html($('#content').html() + _temp);	
		});
		delBoard();
	}

	// 修改文章
	function modifyArticle(){
		var datas = $('.article-modify');
		for(var i=0; i<datas.length; i++){
			datas[i].index = i;
			datas[i].onclick = function(){
				var dataId = parseInt($('.article-id').eq(this.index).text());
				window.location.href = 'modifyArticle.html?id='+ dataId;
			}
		}
	}

	//修改日记
	function modifyDiary(){
		var datas = $('.diary-modify');
		for(var i=0; i<datas.length; i++){
			datas[i].index = i;
			datas[i].onclick = function(){
				var dataId = parseInt($('.diary-id').eq(this.index).text());
				window.location.href = 'modifyDiary.html?id='+ dataId;
			}
		}
	}

	// 删除文章
	function delArticle(){
		var datas = $('.article-del');
		for(var i=0; i<datas.length; i++){
			datas[i].index = i;
			datas[i].onclick = function(){

				if( confirm("确定删除文章吗") ){
					var dataId = parseInt($('.article-id').eq(this.index).text());
					$.ajax({
						url:  "http://"+host+"/delHandle_get",
						type: 'get',
						data: "biao=article &id="+dataId,
						contentType: "application/x-www-form-urlencoded",
					 	dataType: 'text',
					 	success: function(result){
					 		alert(result);
					 		window.location.href =  "http://"+host+"/manage.html";
					 	},
					 	fail: function(err, status){
					 		console.log(err);
					 	}
					});
				}
			}
		}
	}

	// 删除日记
	function delDiary(){
		var datas = $('.diary-del');
		for(var i=0; i<datas.length; i++){
			datas[i].index = i;
			datas[i].onclick = function(){

				if( confirm("确定删除日记吗") ){
					var dataId = parseInt($('.diary-id').eq(this.index).text());
					$.ajax({
						url:  "http://"+host+port+"/delHandle_get",
						type: "get",
						data: "biao=diary &id="+dataId,
						contentType: "application/x-www-form-urlencoded",
					 	dataType: "text",
					 	success: function(result){
					 		alert(result);
					 		window.location.href =  "http://"+host+"/manage.html";
					 	},
					 	fail: function(err, status){
					 		console.log(err);
					 	}
					});
				}
			}
		}
	}

	// 删除留言
	function delBoard(){
		var datas = $('.board-del');
		for(var i=0; i<datas.length; i++){
			datas[i].index = i;
			datas[i].onclick = function(){

				if( confirm("确定删除留言吗") ){
					var dataId = parseInt($('.board-id').eq(this.index).text());
					$.ajax({
						url:  "http://"+host+"/delHandle_get",
						type: 'get',
						data: "biao=board &id="+dataId,
						contentType: "application/x-www-form-urlencoded;charset=utf8",
					 	dataType: 'text',
					 	success: function(result){
					 		alert(result);
					 		request();
					 	},
					 	fail: function(err, status){
					 		console.log(err);
					 	}
					});
				};
				
			}
		}
	}

});