var fs = require('fs');

var configs = fs.readFileSync('./server.conf').toString().split('\r\n');


var configObj = {};
configs.forEach(function(item){
	var temp =item.split('=');
	configObj[temp[0]] = temp[1];
});

module.exports = configObj;
