let query = require('./mysql.js');
let bodyParser = require('body-parser');
let urlencodedParser = bodyParser({extended: false});

function routes(app){

	// 展示回复
	app.post('/get_reply_post', urlencodedParser, function(req, res){
		var sql = 'SELECT * FROM reply';
	    query(sql, function(err, result){
			if(err) {
				console.log(err.message);
				return;
			}
			console.log("get_reply_post success");
			
			result.map(function(item, index){
				item.content = item.content.replace(/</g, "&lt;").replace(/>/g, "&gt;");
				item.content = item.content.replace(/ /g, "&nbsp;").replace(/\r\n/g, "<br/>");
				item.content = item.content.replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
			});

	        res.send(result); // mysql默认返回是数组 数组的成员是对象  
	        res.end(); // 使服务器停止处理脚本，返回当前结果  	
	    });
	});

	// 发布回复
	app.post('/reply_post', urlencodedParser, function(req, res){
		var sql = "INSERT reply(personId,name,targetName,content,time) VALUE ("
			+req.body.personId+",'"+req.body.name+"','"+req.body.targetName+"','"
			+req.body.content+"','"+getNowFormatDate()+"')";
	    query(sql, function(err, result){
			if(err) {
				console.log(err.message);
				return;
			}
			console.log("reply_post success");

	        res.send("发表回复成功！"); // mysql默认返回是数组 数组的成员是对象  
	        res.end(); // 使服务器停止处理脚本，返回当前结果  	
	    });
	});
	
	// 展示留言
	app.post('/getBoard_post', urlencodedParser, function(req, res){
		var sql = "select * from board";
	    query(sql, function(err, result){
			if(err) {
				console.log(err.message);
				return;
			}

			console.log("getBoard_post success");

			result.map(function(item, index){
				item.content = item.content.replace(/</g, "&lt;").replace(/>/g, "&gt;");
				item.content = item.content.replace(/ /g, "&nbsp;").replace(/\r\n/g, "<br/>");
				item.content = item.content.replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
			});
	        res.send(result); // mysql默认返回是数组 数组的成员是对象  
	        res.end(); // 使服务器停止处理脚本，返回当前结果  	
	    });
	});

	// 发布留言
	app.post('/publishBoard_post', urlencodedParser, function(req, res){
		console.log(req.body.content);
		var content = req.body.content.replace(/\'/g, "\\'");
		req.body.content = content.replace(/\"/g, '\"');

		var sql = "INSERT board(name,content,time) VALUE ('"+req.body.name
			+"','"+req.body.content+"','"+getNowFormatDate()+"')";
	    query(sql, function(err, result){
			if(err) {
				console.log(err.message);
				return;
			}
			console.log("publishBoard_post success");

	        res.send("发表留言成功！"); // mysql默认返回是数组 数组的成员是对象  
	        res.end(); // 使服务器停止处理脚本，返回当前结果  	
	    });
	});
	
	// 获取要展示的文章
	app.post('/showArticle_post', urlencodedParser, function(req, res){
		console.log(req.body.id);
		var sql = 'SELECT * FROM article where id='+req.body.id;
	    query(sql, function(err, result){
			if(err) {
				console.log(err.message);
				return;
			}

			console.log("showArticle_post success" + result[0].id);

			// 空格 换行 tab 转换为html的格式
			result[0].content = result[0].content.replace(/</g, "&lt;").replace(/>/g, "&gt;");
			result[0].content = result[0].content.replace(/ /g, "&nbsp;").replace(/\r\n/g, "<br/>");
			result[0].content = result[0].content.replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
			
	        res.send(result[0]); // mysql默认返回是数组 数组的成员是对象  
	        res.end(); // 使服务器停止处理脚本，返回当前结果  	
	    });
	});

 	// 日记 获取所有日记
	app.post('/diary_post', urlencodedParser, function(req, res){
		var sql = 'SELECT * FROM diary';
	    query(sql, function(err, result){
			if(err) {
				console.log(err.message);
				return;
			}

			console.log("diary_post success");

			result.map(function(item, index){
				item.content = item.content.replace(/</g, "&lt;").replace(/>/g, "&gt;");
				item.content = item.content.replace(/ /g, "&nbsp;").replace(/\r\n/g, "<br/>");
				item.content = item.content.replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
			});
	        res.send(result); // mysql默认返回是数组 数组的成员是对象  
	        res.end(); // 使服务器停止处理脚本，返回当前结果  	
	    });
	});

	// 文章归档 获取所有文章
	app.post('/article_post', urlencodedParser, function(req, res){
		var sql = 'SELECT * FROM article';
	    query(sql, function(err, result){
			if(err) {
				console.log(err.message);
				return;
			}
			console.log("article_post success");

	        res.send(result); // mysql默认返回是数组 数组的成员是对象  
	        res.end(); // 使服务器停止处理脚本，返回当前结果  	
	    });
	});

	// 侧边 获取所有文章
	app.post('/side_post', urlencodedParser, function(req, res){
		var sql = 'SELECT * FROM article';
	    query(sql, function(err, result){
			if(err) {
				console.log(err.message);
				return;
			}

			console.log("side_post success");

	        res.send(result); // mysql默认返回是数组 数组的成员是对象  
	        res.end(); // 使服务器停止处理脚本，返回当前结果  	
	    });
	});
	
	// 首页 获取所有文章
	app.post('/index_post', urlencodedParser, function(req, res){
		var sql = 'SELECT * FROM article';
	    query(sql, function(err, result){
			if(err) {
				console.log(err.message);
				return;
			}

			console.log("index_post success");

			result.map(function(item, index){
				item.content = item.content.replace(/</g, "&lt;").replace(/>/g, "&gt;");
				item.content = item.content.replace(/ /g, "&nbsp;").replace(/\r\n/g, "<br/>");
				item.content = item.content.replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
			});
	        res.send(result); // mysql默认返回是数组 数组的成员是对象  
	        res.end(); // 使服务器停止处理脚本，返回当前结果  	
	    });
	});

	// 首页 根据文章类型获取文章
	app.post('/index_type_post', urlencodedParser, function(req, res){
		var sql = "SELECT * FROM article where type='"+req.body.type+"'";
	   query(sql, function(err, result){
			if(err) {
				console.log(err.message);
				return;
			}

			console.log("index_type_post success");
			
			result.map(function(item, index){
				item.content = item.content.replace(/</g, "&lt;").replace(/>/g, "&gt;");
				item.content = item.content.replace(/ /g, "&nbsp;").replace(/\r\n/g, "<br/>");
				item.content = item.content.replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
			});
	        res.send(result); // mysql默认返回是数组 数组的成员是对象  
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

module.exports = routes;