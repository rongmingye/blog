$(function(){

    // 一个文章的模板
    var oneTmpl = "<div class='one'>"
                    +"<div class='one-title'><a href='showArticle.html?id={{id}}'>{{title}}</div></a>"
                    +"<div class='clearfix one-content'>"
                        +"<img src='img/logo.jpg' alt='' class='f-left'>"
                        +"<div class='f-right one-desc'>"
                            +"<a href='showArticle.html?id={{id}}'>"
                            +"<div class='one-desc-content'>{{content}}</div></a>"
                            +"<div class='one-tip'>"
                                +"<span class='one-name'>O叶</span>"
                                +"<span class='one-time'>{{time}}</span>"
                                +"<span class='one-type'>{{type}}</span>"
                            +"</div></div></div></div>";

    $('#article-show').html('');
    
    var page = 1; //记录获取数据的第几页, 即第几个按钮
    var curlistIndex = 0; // 记录按钮高亮

    var articleData = []; // 数据数组

    // 分析url, 确定有没有文章类型
    var articleType;
    getRequest();
    function getRequest(){
        var str = location.search;
        if(str){
            var url = str.substr(1), arr = url.split('&'), request = {};
            for(var i=0; i<arr.length; i++){
                var key=arr[i].split('=')[0], val = arr[i].split('=')[1] ;
                request[key] = val;
            }
            articleType = request.type;
        }
    }

    // url有没有请求文章类型，有则请求该类型的文章，没有则请求所有文章
    if(articleType){
        $.ajax({
            url: "/index_type_post",
            type: "post",
            contentType: "application/x-www-form-urlencoded;charset=utf8", // 请求时的数据类型
            dataType: "json", // 数据响应数据类型
            data: "type="+articleType,
            success: function(result){
                articleData = result;
                showArticle(page);
                articleType = undefined;
            },
            fail: function(err, status){
                console.log(err)
            }
        });
    }else{
        $.ajax({
            url: "/index_post",
            type: 'post',
            contentType: 'application/x-www-form-urlencoded;', // 请求时的数据类型
            dataType: 'json', // 数据响应数据类型
            data: null,
            success: function(result){
                articleData = result;
                showArticle(page);
            },
            fail: function(err, status){
                console.log(err)
            }
        });
    }
   
    // 获取到数据后，显示文章
    // len从1开始，渲染第一页，
    function showArticle(page){
        var arr = []; // 临时储存页面
    	$("#article-btn-list li").eq(curlistIndex).css("background", '#f60').siblings().css("background", '#fff');

        articleData.map(function(item, index){ 
	    	if(index<page*5 && index>=(page-1)*5){

                // 获取日期格式
                item.time = item.time.split("T")[0];
                var arrTime = item.time.split("-");
                var date = parseInt(arrTime[2])+1;
                arrTime[2] = date;
                item.time = arrTime.join("-");

		        var _tmpl = oneTmpl.replace("{{id}}", item.id)
                                    .replace("{{title}}", item.title)
                                    .replace("{{id}}", item.id)
		        					.replace("{{content}}", item.content)
		        					.replace("{{time}}", item.time)
		        					.replace("{{type}}", item.type);
		 		arr.unshift(_tmpl);
		 	}
   		});
   		$('#article-show').html(arr);
   		arr = [];
    }
    
    // 点击按钮
    $("#article-btn-list li").click(function(){
        page = $(this).text();
        curlistIndex = $(this).index()-1;
        showArticle(page)
    });
    
    // 往左
    $('#btn-list-left').click(function(){
        page--;
        curlistIndex--;

        // 没到0页面
        if(curlistIndex<0 && page!=0){
        	curlistIndex = 0;
        	$("#article-btn-list li").each(function(index, item){ 
                    $(item).html(parseInt($(item).html())-1);
        	});
        }
        //到了0页面
        if(page<1) {
        	page = 1;
        	curlistIndex = 0;
        }

        showArticle(page)
    });

    // 往右
    var maxlen = articleData.length;
    $('#btn-list-right').click(function(){
    	var _page = page;
        page++;

        // 是否大于二十个文章, 即四个按钮
        if(maxlen>20){

        	// 看有没余数, 有则数据按钮等于maxlen/5加一
        	if(maxlen%5 != 0){
        		if(page>parseInt(maxlen/5)+1){
                	page = parseInt(maxlen/5)+1;
        		}
        	}else{
        		if(page>parseInt(maxlen/5) ){
        			page = parseInt(maxlen/5);
        		}
        	}

        	// 看是否大于4(第四个按钮)
        	page>4? curlistIndex=3 : curlistIndex = page-1;
            
        	// 如果大于第四个 而且数据按钮变了, 则按钮数字都加1
        	if(page>4 && _page != page){
        		$("#article-btn-list li").each(function(index, item){ 
                    $(item).html(parseInt($(item).html())+1);
        		});
        	}
        	showArticle(page);

        }else{
            if(page>4) {
           		page = 4;
            }
            curlistIndex = page-1;
          	showArticle(page);
        }
    });

      //获取当前日期
    function getNowFormatDate(){
        var date = new Date();
        var seperator1 = "-";

        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();

        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
    }

     //获取当前时间
    function getNowFormatTime(){
        var date = new Date();

        var cHour = date.getHours();
        var cMinute = date.getMinutes();

      
        if (cMinute >= 0 && cMinute <= 9) {
            cMinute = "0" + cMinute;
        }
        var currentTime = cHour + ":" + cMinute ;
        return currentTime;
    }

    // 问候语
    showGreet();
    function showGreet(){
        var timer = null;
        $("#cur-data").html( getNowFormatDate() );
        $("#cur-time").html( getNowFormatTime() );

        timer = setInterval(function(){
            $("#cur-time").html( getNowFormatTime() );
        }, 60000);
       
    }

    // 轮播
    picPlayer();
    var curPic = 1; // 记录当前是第几张图片
    function picPlayer(){
        var timer = null;
        $("#img-list  img").eq(0).addClass("imgActive").siblings().removeClass("imgActive");
        timer = setInterval(function(){
            curPic++;
            if(curPic==5){ curPic = 1;}
            $("#player > img").attr("src", "img/"+curPic+".jpg");
            $("#img-list  img").eq(curPic-1).addClass("imgActive").siblings().removeClass("imgActive");
            $("body").css("background-image", "url('../img/"+curPic+".jpg')");
        }, 1500);
    }

});
	
