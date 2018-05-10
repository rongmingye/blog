$(function(){

	// 请求文章数据
	$.ajax({
        url: "/side_post",
        type: "post",
        contentType: "application/x-www-form-urlencoded;",
        data: null,
        dataType: "json",
        success: function(result){
           showSide(result);           
        },
        fail: function(err, status){
            console.log(err);
        }
    });

	// 获取到文章数据后，根据显示文章的类型，并统计该类型的个数
	function showSide(result){
		var flag; // 判断类型存不存在
		result.map(function(item, index){
			flag = 0; // 0不存在该类型 1存在类型
			var list = $("#side-list").children();

			for(var i=0; i<list.length; i++){
				var curList = list.eq(i).children("a");
				if(curList.children("strong").text() == item.type){
					flag = 1;
					var num = parseInt(curList.children("span").text() );
					num++;					
					curList.children("span").text(num);
				}
			}

			if(flag == 0){
				$("#side-list").append("<li><a href='/index.html?type="
					+item.type+"'><strong>"
				+item.type+"</strong><span class='type-num'>1</span></a></li>");				
			}
		})
	}

});