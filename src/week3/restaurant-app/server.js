const Menu = require('../../week2/restaurant/classes/Menu')
const Restaurant = require('../../week2/restaurant/classes/Restaurant')
const { restaurant_database } = require('../../week2/restaurant/test')

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
    await restaurant_database.connect()
    await restaurant_database.retrieveRestaurants().then(restaurants => {
        response.render('home', {restaurants: restaurants})
    })
})

app.get('/about', async (request, response) => {
    await restaurant_database.connect()
    await restaurant_database.retrieveMenus().then(menus => {
        response.render('about', {menus: menus, menuItems: menus.menuItems})
    })
})

const server = app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})


