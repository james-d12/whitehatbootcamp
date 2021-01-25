const database = require('./database')

const express = require('express');
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const { Restaurant } = require('./models');

const app = express();
const port = 3000;

const handlebars = expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})
app.engine('handlebars', handlebars)
app.set('view engine', 'handlebars')

app.use(express.static('public'));

app.get('/', async (request, response) => {
    const restaurants = await Restaurant.findAll()
    response.render('home', {restaurants})
})


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})


