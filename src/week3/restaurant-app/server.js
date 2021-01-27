const database = require('./server/private/database')

const express = require('express');
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');

const app = express();
const port = 3000;

const handlebars = expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})

app.engine('handlebars', handlebars)
app.set('view engine', 'handlebars')

app.use(express.static('public/'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(require('./server/routes/router'))

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})