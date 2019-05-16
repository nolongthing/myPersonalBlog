var fs = require('fs');

var path = new Map();

var fileArr = fs.readdirSync('./web');

fileArr.forEach(function(item){
	var temp = require('./web/'+item);
	if(temp.path){
		for ( [key,value] of temp.path) {
			if(!path.get(key)){
				path.set(key,value);
			}else{
				throw 'url:'+key+' 错误'
			}
		}
	}
});
module.exports = path;


