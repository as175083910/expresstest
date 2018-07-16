const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Hello World!'))

app.route('/book')
    .get((req, res) => res.send('Get a random book'))
    .post(function (req, res) {
        res.send('Add a book')
    })
    .put((req, res) => res.send('Update the book'))
    .all((req, res) => res.send('Unkown the book'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))