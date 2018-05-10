var express = require('express'); // 快速构建服务器
var app = express();

var routes = require('./routes.js');
var routesAdmin = require('./routesAdmin.js');
routes(app);  // 路由到另一个页面
routesAdmin(app);

app.use(express.static('view'));
app.use(express.static('admin'));

//获取默认页面
app.get('/', function(req, res){
    res.sendFile(__dirname+'/view/'+'index.html');
});

// 定时连接mysql， 解决8小时断开连接mysql问题
let count = 0;
setInterval(function(){
	let sql = "select * from article where id = '1'";
	query(sql, function(err, result){
		if(err) {
			console.log(err.message);
			return;
		}
		count++;
		console.log("mysql+request"+ count);
    });

}, 1000*60*60*7);


var server = app.listen(8080, '0.0.0.0', function(){
	var host = server.address().address;
	var port = server.address().port;

	console.log("http://%s:%s", host, port);
});
