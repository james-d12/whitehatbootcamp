const database = require('./database')

const express = require('express');
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const { Restaurant, Menu, MenuItem } = require('./models');

const app = express();
const port = 3000;

const handlebars = expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})
app.engine('handlebars', handlebars)
app.set('view engine', 'handlebars')

app.use(express.static('public'));

app.get('/', async (request, response) => {
    const restaurants = await Restaurant.findAll({
        include: [{model: Menu, as: 'menus'}],
        nest: true
    })
    response.render('home', {restaurants})
})

app.get('/restaurants/:id', async (request, response) => {
    const restaurant = await Restaurant.findByPk(request.params.id)
    console.log(restaurant)
    const menus = await restaurant.getMenus({
        include: [{model: MenuItem, as: 'items'}],
        nest: true
    })
    response.render('restaurant', {restaurant, menus})
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})


