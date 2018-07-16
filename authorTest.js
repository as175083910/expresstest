const express = require('express');
const router = express.Router();
const app = express();

//  predicate the router with a check and bail out when needed
router.use((req, res, next) => {
    if (!req.headers['x-auth']) return next('router');
    next();
});

router.get('/', (req, res) => res.send('hello, user!'));

//  use the router and 401 anything falling through
app.use('/admin', router, (req, res) => res.sendStatus(401));

app.listen(3000, () => console.log('Example app listening on port 3000!'));