var createConnection = require('./daoUtil.js');
var creatTime = require('../util/detailTime.js').creatTime;

function writeDaily(data,success) {
	var connection = createConnection();
	connection.connect();

	var c_time = creatTime();
	var params = [data.contentEnglish,data.contentChinese,data.where,c_time];
	var querySql = 'insert into everyday (`content_english`,`content_chinese`,`where`,`c_time`) values (?,?,?,?);';
	connection.query(querySql,params,function(error, result) {
		if(error == null){
			success(result);
		}else{
			console.log(error);
		};
	});
	connection.end();
};

function getDaily(success) {
	var connection = createConnection();
	connection.connect();
	var querySql = 'select * from everyday order by id desc limit 1;';
	connection.query(querySql,function(error, result) {
		if(error == null){
			success(result);
		}else{
			console.log(error);
		};
	});
	connection.end();
};


module.exports= {
	writeDaily,
	getDaily,
};