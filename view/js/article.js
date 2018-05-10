$(function(){
    
    var articleData = [];
    // 请求文章数据
    $.ajax({
        url: "/article_post",
        type: "post",
        contentType: "application/x-www-form-urlencoded;",
        data: null,
        dataType: "json",
        success: function(result){
            articleData = result;
            showArticle();
        },
        fail: function(err, status){
            console.log(err);
        }
    });

    // 获取到文章数据后，按年份排列数据的标题
    function showArticle(){
        var z;
        var curYear;
        var curDate;

        articleData.map(function(item, index){
            // 获取日期格式
            item.time = item.time.split("T")[0];
            var arrTime = item.time.split("-");
            var date = parseInt(arrTime[2])+1;
            arrTime[2] = date;
            item.time = arrTime.join("-");

            curYear = item.time.split('-')[0];
            curDate = item.time.split('-');
            curDate.shift();
            curDate = curDate.join('-').split('T')[0];
            z = 1;

            //判断是否存在今年, 存在z=1, 不存在z=0; 不存在则新增一年的模板
            var years = $('#main-content h3');
            for(var i=0; i<years.length; i++){
                if(curYear == years[i].innerHTML ){ z = 1; break;}
                else{ z=0; }
            }
            if(z==0){
                $('#main-content').append("<div class='one-year-list'><h3 id="
                    +curYear+" class='year'>"+curYear+"</h3><ul></ul></div>");
            }

            // 获取年份插入文章标题
            $('#'+curYear).next().prepend("<li><a href='showArticle.html?id="+item.id+"'>"
                +item.title +"<span>"+curDate+"</span></a></li>");
        });
    }
    
});