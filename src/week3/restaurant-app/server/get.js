const { Restaurant, Menu, MenuItem } = require('../private/models');
const { app } = require('./setup')

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
    response.render('restaurant/restaurant', {restaurant, menus})
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