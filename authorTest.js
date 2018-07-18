const express = require('express');
const rt = express.Router();
const app = express();
const fs = require('fs');

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.get('/', function (req, res, next) {
    //  throw new Error('BROKEN'); //   Express will catch this on its own.
    fs.readFile(`${__dirname}/file-does-not-exist`, function (err, data) {
        if (err) {
            next(err); //   Pass errors to Express.
        }
        else {
            res.send(data);
        }
    });
});

app.get('/fswe', [
    function (req, res, next) {
        fs.writeFile(`${__dirname}/inaccessible-path`, 'data', next);
    },
    function (req, res) {
        res.send('OK');
    }
])

app.use('/', function (err, req, res, next) {
    console.error(err.stack, 'err test');
    res.status(500).send('Something broke!');
});
//  predicate the router with a check and bail out when needed
rt.use((req, res, next) => {
    console.log(req.headers['x-auth'], 'x-auth test')
    if (!req.headers['x-auth']) return next('router');
    next();
});

rt.use((req, res, next) => {
    console.log('router test', __dirname, __filename);
    next();
});

rt.get('/', (req, res) => res.render('test',{myargument: 'argument input complete!'}));

//  use the router and 401 anything falling through
app.use('/admin', rt, (req, res) => {
    console.log('Active next(\'router\')!');
    res.sendStatus(401);
});


app.listen(3000, () => console.log('Example app listening on port 3000!'));