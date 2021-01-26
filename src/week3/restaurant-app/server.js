const database = require('./private/database')

const express = require('express');
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const { Restaurant, Menu, MenuItem } = require('./private/models');

const app = express();
const port = 3000;

const handlebars = expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})
app.engine('handlebars', handlebars)
app.set('view engine', 'handlebars')

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', async (request, response) => {
    const restaurants = await Restaurant.findAll({
        include: [{model: Menu, as: 'menus'}],
        nest: true
    })
    response.render('home', {restaurants})
})

app.get('/restaurants/add', async(request, response) => {
    const restaurant = await Restaurant.findByPk(request.params.id)
    response.render('restaurant/add', {restaurant})
})

app.get('/restaurants/:id', async (request, response) => {
    const restaurant = await Restaurant.findByPk(request.params.id)
    const menus = await restaurant.getMenus({
        include: [{model: MenuItem, as: 'items'}],
        nest: true
    })
    response.render('restaurant', {restaurant, menus})
})

app.get('/restaurants/:id/delete', async (request, response) => {
    Restaurant.findByPk(request.params.id)
        .then(restaurant => {
            restaurant.destroy()
            response.redirect('/')
    })
})

app.get('/restaurants/:id/edit', async (request, response) => {
    const restaurant = await Restaurant.findByPk(request.params.id)
    const menus = await restaurant.getMenus({
        include: [{model: MenuItem, as: 'items'}],
        nest: true
    })
    response.render('restaurant/edit', {restaurant, menus})
})


app.post('/restaurants/:id/:menuId/:menuItemId/edit', async(request, response) => {
    const restaurant = await Restaurant.findByPk(request.params.id)
    const menus = await restaurant.getMenus()
    const item = menus.items.findByPk(request.params.menuItemId)

    item.update({name: body.name, price: body.price})
    response.redirect('/restaurants/:id/edit')
})

app.post('/restaurants/:id/edit', async (request, response) => {
    const restaurant = await Restaurant.findByPk(request.params.id)
    const body = request.body 

    restaurant.update({name: body.name, image: body.url})
    response.redirect(`/`)
})

app.post('/restaurants/add', async(request, response) => {
    const body = request.body;
    await Restaurant.create({name: body.name, image: body.url})
    response.redirect('/')
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})


