var url = require('url');
var articleDao = require('../dao/articleDao.js');

var path = new Map();


//往数据库中写入daily
function writeArticle(request, response) {
	request.on('data', function(data) {
		articleDao.writeArticle(JSON.parse(data.toString()), function(result) {
			response.writeHead(200);
			response.write("插入成功");
			response.end();
		})
	})
};
path.set('/writeArticle', writeArticle);

// 在库中读取文章列表
function getArticles(request,response){
	var queryArr = [];
	var params = url.parse(request.url,true).query;
	queryArr.push((params.page-1)*5);
	queryArr.push(params.count - 0);
	articleDao.getArticles(queryArr,function(result){
		var data = JSON.stringify(result);
		response.writeHead(200);
		response.write(data);
		response.end();
	})
};
path.set('/getArticles', getArticles);

//通过id值读取文章
function getArticle(request,response){
	var param = url.parse(request.url,true).query;
	articleDao.getArticle(param.id,function(result){
		var data = JSON.stringify(result);
		response.writeHead(200);
		response.write(data);
		response.end();
	})
};


path.set('/getArticle', getArticle);

module.exports.path = path;
