$(function(){

	var articleId;

    // 分析url
	getRequest();
    function getRequest(){
        var str = location.search;
        if(str){
            var url = str.substr(1), arr = url.split('&'), request = {};
            for(var i=0; i<arr.length; i++){
                var key=arr[i].split('=')[0], val = arr[i].split('=')[1] ;
                request[key] = val;
            }
            articleId = request.id;
        }
    }

    // 请求要修改的文章
    $.ajax({
        url:"/modify_article_post",
        type: "post",
        contentType: "application/x-www-form-urlencoded;charset=utf8", // 请求时的数据类型
        dataType: "json", // 数据响应数据类型
        data: "id="+articleId,
        success: function(result){
            showArticle(result);
        },
        fail: function(err, status){
            console.log(err)
        }
    });
   
    // 填充文章
    function showArticle(result){
    	$('#id').val(result.id);
    	$('#title').val(result.title);
    	$('#author').val(result.author);
    	$('#type').val(result.type);
    	$('#content').html(result.content);
    }

});