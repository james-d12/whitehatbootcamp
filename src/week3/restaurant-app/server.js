const { retrieveDataFromSQL } = require('../../week2/restaurant/index')

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

app.use(express.static('public'));

app.get('/', async (request, response) => {
    await retrieveDataFromSQL().then(restaurants => {
        response.render('home', {restaurants})
    })
})

app.get('/about', (request, response) => {
    response.render('about', {date: new Date()})
})

const server = app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})
