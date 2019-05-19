var configObj = require('./config');
var express = require('express');
var url = require('url');
var loader = require('./loader.js');
var svgCaptcha = require('svg-captcha')

var app = new express();


const cap = svgCaptcha.create();      //创建随机验证码对象


app.use(express.static(configObj.web_path));

app.post('/writeDaily',loader.get('/writeDaily'));

app.get('/getDaily',loader.get('/getDaily'));

app.post('/writeArticle',loader.get('/writeArticle'));

app.get('/getArticles',loader.get('/getArticles'));

app.get('/getArticle',loader.get('/getArticle'));

app.listen(configObj.port, function() {
	console.log('Ready');
});
