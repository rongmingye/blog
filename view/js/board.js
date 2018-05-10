$(function(){

	// 一个留言的模板
	var oneCommentTemp = '<div class="comment-one clearfix">'
    	    		+'<div class="f-left one-left"><img src="img/logo.jpg" alt=""></div>'
    	    		+'<div class="f-right one-right">'
    	    			+'<div class="one-right-top clearfix">'
    	    				+'<span class="name-id">{id}</span>'
    	    				+'<span class="issuer">{name}</span>'
    	    				+'<span class="publish-time f-right">{time}</span>'
    	    			+'</div>'

    	    			+'<div class="one-right-content">{content}</div>'
	    	    		+'<div class="one-right-footer">'
	    	    				+'<span class="recall">回复</span>'
	    	    				+'<span class="nice"><img src="img/good.png" alt="" /></span>'
	    	    				+'<span class="bad"><img src="img/bad.png" alt="" /></span>'
	    	    		+'</div></div></div>';

	 // 发表回复的框的模板
	var replyTemp = '<div class="reply f-left" id="reply">'
	 				+'<p id="tip2"></p>' 
					+'<p><label for="">姓名：</label>'
	    				+'<input type="text" placeholder="rmy" id="reply-name"></p>'
	    			+'<p><label for="">内容：</label>'
	    				+'<textarea id="reply-content" placeholder="来说两句吧..."></textarea></p>'
	    			+'<p><label for=""></label>'
	    				+'<input type="button" value="提交回复" id="reply-submit">'
	    				+'<input type="button" value="取消" id="reply-cancel"></p>'
	    			+'</div>';

	 // 展示一条回复的模板
	 var showReplyTemp = '<div class="show-reply f-left">'
	 						+'<span class="show-reply-id">{id}</span>'
	 						+'<div class="show-reply-name">'
									+'<span class="again-name">{name}</span>'
									+' @ {targetName} :'
									+'<span class="again-recall">回复</span></div>'
							+'<div class="show-reply-content">{content}</div>'
			    	    +'</div>';
	
	// 发表留言的显示和隐藏
	showCommentForm();
	function showCommentForm(){
		var reserver = 1;
		$("#publish-content").hide();
		$("#publish-btn").click(function(e){
			if(reserver==1){
				$("#publish-content").show();
				reserver = 0;
			}else if(reserver == 0){
				$("#publish-content").hide();
				reserver = 1;
			}
			
		});
		$("#publish-cancel").click(function(e){
			$("#publish-content").hide();
		});
	}
	
	// 获取留言的请求
	getAjaxComment();
	function getAjaxComment(){
		$.ajax({
			url: "/getBoard_post",
			type: "post",
			contentType: "application/x-www-form-urlencoded;",
			data: null,
			dataType: "json",
			success: function(result){
				showComment(result);
			},
			fail: function(err, status){
				console.log(err);
			}
		});
	}

	// 获取回复的请求
	function getAjaxReply(){
		$.ajax({
			url: "/get_reply_post",
			type: "post",
			contentType: "application/x-www-form-urlencoded;",
			data: null,
			dataType: "json",
			success: function(result){
				showReply(result);
			},
			fail: function(err, status){
				console.log(err);
			}
		});
	}

	// 展示数据库的留言
	function showComment(result){

		result.map(function(item, index){
			// 获取日期格式
			item.time = item.time.split("T")[0];
			var arrTime = item.time.split("-");
			var date = parseInt(arrTime[2])+1;
			arrTime[2] = date;
			item.time = arrTime.join("-");

			var temp = oneCommentTemp.replace("{id}", item.id)
								.replace("{name}", item.name)
								.replace("{content}", item.content)
								.replace("{time}", item.time);
			$("#new-comment").html($("#new-comment").html()+temp);
		});

		 getAjaxReply();

		 // 回复框的显示和隐藏
		$('.recall').click(function(){
			var index = $(".recall").index($(this));
			var text = $('.recall').eq(index).text();

			if(text == "回复"){
				$('#reply').remove();
				$('.recall').text("回复");
			 	$('.recall').eq(index).text("取消回复");
			 	$(this).parent().parent().after(replyTemp);
			 	var id = $('.name-id').eq(index).text();
			 	var targetName = $('.issuer').eq(index).text();	 	
				submitReply(id, targetName);	

				$('#reply-cancel').click(function(){
					$('#reply').remove();
					$('.recall').text("回复");
				});	 	

			}else if( text == "取消回复"){
			 	$('.recall').text("回复");
			 	$('#reply').remove();
			}
		});

		// 点赞 
		var nice = true;
		$(".nice").click(function(){
			var index = $(".nice").index($(this));
			if(nice == true){
				nice = false;
				$(this).children("img").animate({ width: '16px', height: '16px' }, 1000);
				$(".bad").eq(index).children("img").animate({ width: '12px', height: '12px' }, 1000);
			}else if(nice == false){
				nice = true;
				$(this).children("img").animate({ width: '12px', height: '12px' }, 1000);
			}
		});
		// 不咋滴
		var bad = true;
		$(".bad").click(function(){
			var index = $(".bad").index($(this));
			if(bad == true){
				bad = false;
				$(this).children("img").animate({ width: '16px', height: '16px' }, 1000);
				$(".nice").eq(index).children("img").animate({ width: '12px', height: '12px' }, 1000);
			}else if(bad == false){
				bad = true;
				$(this).children("img").animate({ width: '12px', height: '12px' }, 1000);
			}
		});
	}

	// 展示回复
	function showReply(result){
		result.map(function(item, index){
			var index = item.personId-1;
			var temp = showReplyTemp.replace("{id}", item.personId) // id是第几个留言
								.replace("{name}", item.name)
								.replace("{targetName}", item.targetName)
								.replace("{content}", item.content);

			$('.comment-one').eq(index).append(temp);
		});

		 // 再次回复框的显示和隐藏
		 // id是第几个留言
		$('.again-recall').click(function(){
			var index = $(".again-recall").index($(this));
			var text = $('.again-recall').eq(index).text();

			if(text == "回复"){
				$('#reply').remove();
				$('.again-recall').text("回复");
			 	$('.again-recall').eq(index).text("取消回复");

			 	$('.show-reply').eq(index).after(replyTemp); // 再该回复的后面显示回复框
			 	var id = $('.show-reply-id').eq(index).text(); //第几个留言
			 	var targetName = $('.again-name').eq(index).text();	 	
				submitReply(id, targetName);	

				$('#reply-cancel').click(function(){
					$('#reply').remove();
					$('.again-recall').text("回复");
				});	 	

			}else if( text == "取消回复"){
			 	$('.again-recall').text("回复");
			 	$('#reply').remove();
			}
		 });
	}

	// 提交留言的表单
	submitBoard();
	function submitBoard(){
		$("#submit").click(function(){
			var name = $("#name").val();
			var content = $("#content").val();

			// 验证表单是否为空
			if(name==''){
				$("#tip").show();
				$("#tip").html("请输入姓名！");
				return false;
			}else if(content==''){
				$("#tip").show();
				$("#tip").html("请输入留言内容！");
				return false;
			}

			$("#publish-content").hide();
			$("#name").val('');
			$("#content").val('');

			$.ajax({
				url: "/publishBoard_post",
				type: "post",
				contentType: "application/x-www-form-urlencoded;chaset=utf8",
				data: "name="+name+"&content="+content,
				dataType: "text",
				success: function(result){
					$("#new-comment").html('');
					getAjaxComment();
				},
				fail: function(err, status){
					console.log(err);
				}
			})
		});
	}

	// 提交回复表单
	function submitReply(personId, targetName){
		$("#reply-submit").click(function(){
			var name = $("#reply-name").val();
			var content = $("#reply-content").val();

			// 验证表单是否为空
			if(name==''){
				$("#tip2").show();
				$("#tip2").html("请输入姓名！");
				return false;
			}else if(content==''){
				$("#tip2").show();
				$("#tip2").html("请输入回复内容！");
				return false;
			}

			$('#reply').remove();
			$('.recall').text("回复");
			$('.again-recall').text("回复");

			$.ajax({
				url: "/reply_post",
				type: "post",
				contentType: "application/x-www-form-urlencoded;chaset=utf8",
				data: "name="+name+"&content="+content+"&personId="+personId+"&targetName="+targetName,
				dataType: "text",
				success: function(result){
					alert(result);
					window.location.href = "http://"+host+"/board.html"
				},
				fail: function(err, status){
					console.log(err);
				}
			})
		});
	}

});