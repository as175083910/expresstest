var express = require('express');
var app  = express();
var i = 0;

var requestTime = function (req, res, next) {
    req.requestTime = Date.now();
    console.log(i++);
    next();
};

app.use(requestTime);

app.get('/', function (req, res) {
    var responseText = 'Hello World!<br>'
    responseText += '<small>Requested at: ' + (new Date(req.requestTime)).toLocaleString() + '</small>';
    res.send(responseText);
});

app.use(requestTime);
app.use('/user/:id', function (req, res, next){
    console.log('Request Type:', req.method + ' ' + req.params.id);
    next();
});

app.get('/user/:id', function (req, res) {
    var responseText = 'Hello World!<br>'
    responseText += '<small>Requested at: ' + (new Date(req.requestTime)).toLocaleString() +' user: ' + req.params.id + '</small>';
    res.send(responseText);
});


app.listen(3000);