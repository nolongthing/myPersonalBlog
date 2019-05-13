var configObj = require('./config');
var express = require('express');
var url = require('url');

var app = new express();

app.use(express.static(configObj.web_path));

app.listen(configObj.port, function() {
	console.log('Ready');
});
