let query = require('./mysql.js');
let bodyParser = require('body-parser');
let urlencodedParser = bodyParser({extended: false});

let host = "http://rongmingye.xin";

function routesAdmin(app){

	// 删除文章/日记/留言 根据表名和id
	app.get('/delHandle_get', urlencodedParser, function(req, res){
		var sql = "delete FROM "+ req.query.biao +" where id=" + req.query.id;
	    query(sql, function(err, result){
			if(err) {
				console.log(err.message);
				return;
			}

			console.log(sql);
			res.send("删除成功");
	        res.end(); // 使服务器停止处理脚本，返回当前结果  	
	    });
	});

	// 更新文章
	app.post('/update_article_success', urlencodedParser, function(req, res){
		var sql = "UPDATE article SET title ='"+req.body.title
		+"',author='"+req.body.author+"',type='"+req.body.type 
		+"',content='"+req.body.content+"' where id="+req.body.id;
	    query(sql, function(err, result){
			if(err) {
				console.log(err.message);
				return;
			}

			console.log("update article success");
			res.redirect('/manage.html');
	        res.end(); // 使服务器停止处理脚本，返回当前结果  	
	    });
	});

	// 更新日记
	app.post('/update_diary_success', urlencodedParser, function(req, res){
		var sql = "UPDATE diary SET content='"+req.body.content+"' where id="+req.body.id;
	    query(sql, function(err, result){
			if(err) {
				console.log(err.message);
				return;
			}

			console.log("update diary success");
			res.redirect('/manage.html');
	        res.end(); // 使服务器停止处理脚本，返回当前结果  	
	    });
	});

	// 获取要修改的文章
	app.post('/modify_article_post', urlencodedParser, function(req, res){
		var sql = "SELECT * FROM article where id=" + req.body.id;
	    query(sql, function(err, result){
			if(err) {
				console.log(err.message);
				return;
			}

			console.log("get need modify_article_post success");
			res.send(result[0]);
	        res.end(); // 使服务器停止处理脚本，返回当前结果  	
	    });
	});

	// 获取要修改的日记
	app.post('/modify_diary_post', urlencodedParser, function(req, res){
		var sql = "SELECT * FROM diary where id=" + req.body.id;
	    query(sql, function(err, result){
			if(err) {
				console.log(err.message);
				return;
			}

			console.log("get need modify_article_post success");
			res.send(result[0]);
	        res.end(); // 使服务器停止处理脚本，返回当前结果  	
	    });
	});

	// 发布文章
	app.post('/publicArticle_post', urlencodedParser, function(req, res){
		var content = req.body.content.replace(/\'/g, "\\'");
		req.body.content = content.replace(/\"/g, '\"');

		var sql = "INSERT into article(title,author,content,type,time) VALUE ('"
			+req.body.title+"','"+req.body.author+"','"+req.body.content+"','"+ req.body.type+"','"+getNowFormatDate()+"')";
	    query(sql, function(err, result){
			if(err) {
				console.log(err.message);
				return;
			}

			console.log("public_article_post success \n");
			res.redirect('/index.html');
	        res.end(); // 使服务器停止处理脚本，返回当前结果  	
	    });
	});

	// 发布日记
	app.post('/publicDiary_post', urlencodedParser, function(req, res){
		var content = req.body.content.replace(/\'/g, "\\'");
		req.body.content = content.replace(/\"/g, '\"');

		var sql = "INSERT  into diary(content,time) VALUE ('"+req.body.content+"','"
			+getNowFormatDate()+"')";
	    query(sql, function(err, result){
			if(err) {
				console.log(err.message);
				return;
			}

			console.log("public_diary_post success \n");
			res.redirect('/index.html');
	        res.end(); // 使服务器停止处理脚本，返回当前结果  	
	    });
	});

	// 获取所有的文章
	app.post('/manage_article_post', urlencodedParser, function(req, res){
		var sql = "SELECT * FROM article";
	   query(sql, function(err, result){
			if(err) {
				console.log(err.message);
				return;
			}

			console.log("manage_article_post success");
			res.send(result);
	        res.end(); // 使服务器停止处理脚本，返回当前结果  	
	    });
	});

	// 获取所有日记
	app.post('/manage_diary_post', urlencodedParser, function(req, res){
		var sql = "SELECT * FROM diary";
	    query(sql, function(err, result){
			if(err) {
				console.log(err.message);
				return;
			}

			console.log("manage_diary_post success");
			res.send(result);
	        res.end(); // 使服务器停止处理脚本，返回当前结果  	
	    });
	});

	// 获取所有留言
	app.post('/manage_board_post', urlencodedParser, function(req, res){
		var sql = "SELECT * FROM board";
	    query(sql, function(err, result){
			if(err) {
				console.log(err.message);
				return;
			}

			console.log("manage_board_post success");
			res.send(result);
	        res.end(); // 使服务器停止处理脚本，返回当前结果  	
	    });
	});

}

//获取当前时间
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

module.exports = routesAdmin;