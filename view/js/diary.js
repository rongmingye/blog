$(function(){

	// 请求所有日记的数据
	var diaryData = [];
	$.ajax({
		url: "/diary_post",
		type: "post",
		contentType: "application/x-www-form-urlencoded;",
		data: null,
		dataType: "json",
		success: function(result){
			diaryData = result;
			showDiary(diaryData);
		},
		fail: function(err, status){
			console.log(err);
		}
	});

	//获取日记数据后，显示在页面
	function showDiary(diaryData){
		var flag= true; //是否刷新，是否加载到最后一条了
		var diaryIndex = 4; //用来判断是否达到最后的数据了
		var dataLen = diaryData.length-1;
		var a = 0; // 记录页数

		dataLen<4?$('#loading').hide():$('#loading').show();

		// 先显示5条
		diaryData.map(function(item, index){
		   // 获取日期格式
            item.time = item.time.split("T")[0];
            var arrTime = item.time.split("-");
            var date = parseInt(arrTime[2])+1;
            arrTime[2] = date;
            item.time = arrTime.join("-");

	    	if(index<=4){
	    	 	var tmpl="<div class='one-diary'><img src='img/logo.jpg'><div class='diary-content'>"
	    		     +item.content+"</div><span class='diary-time'>"
	    		     +item.time+"</span></div>";

	    		$('#main-content').html($('#main-content').html()+tmpl);
	    	}
		});
	 
	    // 到达文档底部自动刷新添加日记，每次添加5条
		$(window).scroll(function(){
			if($(this).scrollTop() + $(this).height() == $(document).height() && flag){
				a++;
				setTimeout(function(){
					diaryData.map(function(item, index){
					// 获取日期格式
	                item.time = item.time.split("T")[0];
	                var arrTime = item.time.split("-");
	                var date = parseInt(arrTime[2])+1;
	                arrTime[2] = date;
	                item.time = arrTime.join("-");

			    		if(index>4*a && index<=4*(a+1)+1){
			    	 		var tmpl="<div class='one-diary'><img src='img/logo.jpg'><div class='diary-content'>"
			    		     +item.content+"</div><span class='diary-time'>"+item.time+"</span></div>";

			    			$('#main-content').html($('#main-content').html()+tmpl);
			    			diaryIndex = index;
			    			if(diaryIndex == dataLen){ 
			    				flag = false; 
			    				$('#loading').html('哥，这回真没了');
			    			}
			    		}
					});
				}, 1000);
				
			}
		});
	}
	
});