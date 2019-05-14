var createConnection =require('./daoUtil.js');

var connection = createConnection();
connection.connect();
var querySql = 'select * from tags;';
connection.query(querySql,function(e,r){
	console.log(e);
	console.log(r);
})
connection.end();