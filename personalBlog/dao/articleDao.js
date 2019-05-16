var createConnection = require('./daoUtil.js');
var creatTime = require('../util/detailTime.js').creatTime;


// 插入文章的一系列数据库的操作

function writeArticle(data, success) {
	var connection = createConnection();
	connection.connect();
	var c_time = creatTime();
	var params = [data.title, data.content, c_time, data.tags];
	var querySql = 'insert into article (`title`,`content`,`c_time`,`tags`) values (?,?,?,?);';
	connection.query(querySql, params, function(error, result) {
		if (error == null) {
			success(result);
			var articleId = result.insertId; //拿到插入的文章id
			querytag(data.tags, articleId); //查看传入的标签是否已存在
		} else {
			console.log(error);
		};
	});
	connection.end();

};


//往tags列表中插入标签
function writeTags(tagsArr, articleId,idArr) {
	var c_time = creatTime();
	var value = '';
	tagsArr.forEach(function(item, index) {
		if (index != tagsArr.length - 1) {
			value += '(' + '"' + item + '"' + ',' + c_time + '),'
		} else {
			value += '(' + '"' + item + '"' + ',' + c_time + ' )'
		}
	})
	var connection = createConnection();
	connection.connect();
	var querySql = 'insert into tags (`tag_name`,`c_time`) values ' + value + ';';
	connection.query(querySql, function(error, result) {
		if (error == null) {
			var rows = result.affectedRows;
			var curId = result.insertId;
			for (var i = 0; i < rows; i++) {
				idArr.push(curId);
				curId ++;
			}
			//往tags_article对照表中插入数据
			writeTag_article(articleId,idArr);
		} else {
			console.log(error);
		};
	});
	connection.end();
}

//查询标签是否存在
function querytag(tags, articleId) {
	var tagsArr = tags.replace(/，/g, ',').split(',');
	var idArr = [];
	var value = '';
	tagsArr.forEach(function(item, index) {
		if (index != tagsArr.length - 1) {
			value += 'tag_name=' + '"' + item + '"' + ' or '
		} else {
			value += 'tag_name=' + '"' + item + '"'
		}
	})
	var querySql = 'select * from tags where ' + value + ';';
	var connection = createConnection();
	connection.connect();
	connection.query(querySql, function(error, result) {
		if (error == null) {
			result.forEach(function(item) {
				if (tagsArr.indexOf(item.tag_name) != -1) {
					tagsArr.splice(tagsArr.indexOf(item.tag_name), 1);
					idArr.push(item.id);
				}
			});
			if(tagsArr.length !=0){
				writeTags(tagsArr,articleId,idArr)       //往表中插入还不存在的tags
			} else{
				//插入tag_article对照表
				writeTag_article(articleId,idArr);
			}           
		} else {
			console.log(error);
		};
	});
	connection.end();
}


//插入tag_article对照表
function  writeTag_article(articleId,idArr){
	var value = '';
	idArr.forEach(function(item, index) {
		if (index != idArr.length - 1) {
			value += '('  + item  + ',' + articleId + '),'
		} else {
			value += '('  + item  + ',' + articleId + ' )'
		}
	})
	var connection = createConnection();
	connection.connect();
	var querySql = 'insert into tags_article (`tag_id`,`article_id`) values ' + value + ';';
	connection.query(querySql, function(error, result) {
		if (error == null) {
			console.log(result);
		} else {
			console.log(error);
		};
	});
	connection.end();
}                             //至此，插入文章的系列操作完成

//按倒序方式获取文章列表
function getArticles(params,success) {
	var connection = createConnection();
	connection.connect();
	var querySql = 'select * from article order by id desc limit ?,?;';
	connection.query(querySql,params,function(error, result) {
		if(error == null){
			//处理result中content的内容(前端完成)
			success(result);
		}else{
			console.log(error);
		};
	});
	connection.end();
};

//通过id值查询数据库获得具体某一文章
function getArticle(param,success) {
	var connection = createConnection();
	connection.connect();
	var querySql = 'select * from article where id=?;';
	connection.query(querySql,param,function(error, result) {
		if(error == null){
			success(result);
		}else{
			console.log(error);
		};
	});
	connection.end();
};

module.exports = {
	writeArticle,
	getArticles,
	getArticle
};
