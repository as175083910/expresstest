var express = require('express');
var app = express();

//  respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
    res.send('hello world');
});

//  GET method route
app.get('/', function (req, res) {
    res.send('GET request to the homepage');
});

//  POST method route
app.post('/', function (req, res) {
    res.send('POST request to the homepage');
});

//  Express's method contains:
//  get, post, put, head, delete, options, trace
//  copy, lock, mkcol, move, purge, propfind
//  proppatch, unlock, report, mkactivity
//  checkout, merge, m-search, notify
// subscribe, unsubscribe, patch
// search, connect

//  app['m-search']('/', function ...

//  GET, POST, PUT, DELETE or any else http module will execute
app.all('/secret', function (req, res, next) {
    console.log('Accessing the secret section ...');
    next(); //  pass control to the next handler
});

//  匹配根路径的请求
app.get('/', function (req, res) {
    res.send('root');
});

//  匹配/about路径的请求
app.get('/about', function (req, res) {
    res.send('about');
});

//  匹配/random.text路径的请求
app.get('/random.text', function (req, res) {
    res.send('random.text');
});

//  匹配 acd 和 abcd
app.get('/ab?cd', function (req, res) {
    res.send('ab?cd');
});

//  匹配 abcd, abbcd, abbbcd等
app.get('/ab+cd', function (req, res) {
    res.send('ab+cd');
});

//  匹配 abcd, abxcd, abRABDOMcd, ab123cd等
app.get('/ab*cd', function (req, res) {
    res.send('ab*cd');
});

//  匹配/abe和/abcde
app.get('/ab(cd)?e', function (req, res) {
    res.send('ab(cd)?e');
});

//使用正则表达式的路由路径示例
//  匹配任何路径中含有a的路径:
app.get(/a/, function(req, res) {
    res.send('/a/');
});
