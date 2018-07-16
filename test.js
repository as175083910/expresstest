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

//  使用正则表达式的路由路径示例
//  匹配任何路径中含有a的路径:
app.get(/a/, function(req, res) {
    res.send('/a/');
});

//  匹配butterfly, dragonfly, 不匹配 butterflyman， dragonfly man等
app.get(/.*fly$/, function (req, res) {
    res.send('/.*fly$/');
});

//  Route parameters
//  Route path: /users/:userId/books/:bookId
//  Request URL: http://localhost:3000/users/34/books/8989
//  req.params: { "userId": "34", "bookId": "8989"}
app.get('/users/:userId/book/:bookId', function (req, res) {
    res.send(req.params);
});

//  Route path: /flights/:from-:to
//  Request URL: http://localhost:3000/flights/LAX-SFO
//  req.params: { "from": "LAX", "to": "SFO" }

//  Route path: /plantae/:genus.:species
//  Request URL: http://localhost:3000/plantae/Prunus.persica
//  req.params: { "genus": "Prunus", "species": "persica" }

//  append a regular expression in parentheses
//  Route path: /user/:userId(\d+)
//  Request URL: http://localhost:3000/user/42
//  req.params: { "userId": "42" }

//  Route handlers
//  A single callback function can handle  aroute.For example:
app.get('/example/a', function (req, res) {
    res.send('Hello from A!');
});

//  More than one callback function with next object
app.get('/example/b', function (req, res, next) {
    console.log('the response will be sent by the next function ...');
    next();
}, function (req, res) {
    res.send('Hello from B');
});

//  An array of callback functions can handle a route.For example:
var cb0 = function (req, res, next) {
    console.log('CB0');
    next();
};

var cb1 = function (req, res, next) {
    console.log('CB1');
    next();
};

var cb2 = function (req,res) {
    res.send('Hello from C!')
}

app.get('/example/c', [cb0, cb1, cb2])

// A  combination of independent functions and arrays of functions can handle a route.For example:
/* var cb0 = function (req, res, next) {
    console.log('CB0')
    next()
}

var cb1 = function (req, res, next) {
    console.log('CB1')
    next()
} */

app.get('/example/d', [cb0, cb1], function (req, res, next) {
    console.log('the response will be sent by the next function ...')
    next()
}, function (req, res) {
    res.send('Hello from D!')
})

//  Response methods
// res.download() -- Prompt a file to be downloaded.
// res.end() -- End the response process.
// res.json() -- Send aJSON response.
//  res.jsonp() -- Send aJOSN response with JSONP support.
//  res.redirect() -- Redirect a request.
//  res.send() -- Send a response of various types.
//  res.sendFile() -- Send a file as an octet stream.
//  res.sendStatus() -- set the response status code and send its string representation as the response body.

//  Object.route链式调用
app.route('/book')
    .get(function (req, res) {
        res.send('Get a random book');
    })
    .post(function (req, res) {
        res.send('Add a book');
    })
    .put(function (req, res) {
        res.send('Update the book');
    });





//  Then, load the router module in the app