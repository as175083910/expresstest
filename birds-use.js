//  load the router module in the app
var  birds = require('./birds')
var express = require('express');
var app = express();

//  ...
app.route('/')
    .get((req, res) => res.send('<div>点击<a href="/birds">鸟儿<a>改变网址</div>'))
    .post(function (req, res) {
        res.send('Add a book')
    })
    .put((req, res) => res.send('Update the book'))
    .all((req, res) => res.send('Unkown the book'))
app.use('/birds', birds)

app.listen(3000, () => console.log('Example app listening on port 3000!'))