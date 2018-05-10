$(function(){

    var diaryId;
    getRequest();
    function getRequest(){
        var str = location.search;
        if(str){
            var url = str.substr(1), arr = url.split('&'), request = {};
            for(var i=0; i<arr.length; i++){
                var key=arr[i].split('=')[0], val = arr[i].split('=')[1] ;
                request[key] = val;
            }
            diaryId = request.id;
        }
    }

    $.ajax({
        url: "/modify_diary_post",
        type: "post",
        contentType: "application/x-www-form-urlencoded;charset=utf8", // 请求时的数据类型
        dataType: "json", // 数据响应数据类型
        data: "id="+diaryId,
        success: function(result){
            showDiary(result);
        },
        fail: function(err, status){
            console.log(err)
        }
    });
   
    function showDiary(result){
        $('#id').val(result.id);
        $('#content').html(result.content);
    }

});