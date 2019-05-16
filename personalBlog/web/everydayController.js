var url = require('url');
var everydayDao = require('../dao/everydayDao.js');

var path = new Map();


//往数据库中写入daily
function writeDaily(request, response) {
	request.on('data', function(data) {
		everydayDao.writeDaily(JSON.parse(data.toString()), function(result) {
			response.writeHead(200);
			response.write("插入成功");
			response.end();
		})
	})
};
path.set('/writeDaily', writeDaily);

//在库中读取最新的一条每日一句
function getDaily(request,response){
	everydayDao.getDaily(function(result){
		var data = JSON.stringify(result);
		response.writeHead(200);
		response.write(data);
		response.end();
	})
};
path.set('/getDaily', getDaily);

module.exports.path = path;
