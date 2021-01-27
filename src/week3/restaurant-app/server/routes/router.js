const { Restaurant, Menu, MenuItem } = require('../private/models');
const express = require('express')
const router = express.Router()

const services = require('../services/render')

/* 
router.get('/', async (request, response) => {
    const restaurants = await Restaurant.findAll({
        include: [{model: Menu, as: 'menus'}],
        nest: true
    })
    response.render('home', {restaurants})
})
*/

router.get('/', services.homeRoutes)



router.get('/restaurants/add', async(request, response) => {
    const restaurant = await Restaurant.findByPk(request.params.id)
    response.render('restaurant/add', {restaurant})
})

router.get('/restaurants/:id', async (request, response) => {
    const restaurant = await Restaurant.findByPk(request.params.id)
    const menus = await restaurant.getMenus({
        include: [{model: MenuItem, as: 'items'}],
        nest: true
    })
    response.render('restaurant/restaurant', {restaurant, menus})
})

router.get('/restaurants/:id/delete', async (request, response) => {
    Restaurant.findByPk(request.params.id)
        .then(restaurant => {
            restaurant.destroy()
            response.redirect('/')
    })
})

router.get('/restaurants/:id/edit', async (request, response) => {
    const restaurant = await Restaurant.findByPk(request.params.id)
    const menus = await restaurant.getMenus({
        include: [{model: MenuItem, as: 'items'}],
        nest: true
    })
    response.render('restaurant/edit', {restaurant, menus})
})

router.post('/restaurants/:id/edit', async (request, response) => {
    const restaurant = await Restaurant.findByPk(request.params.id)
    const body = request.body 

    restaurant.update({name: body.name, image: body.url})
    response.redirect('/');
})

router.post('/restaurants/add', async(request, response) => {
    const body = request.body;
    await Restaurant.create({name: body.name, image: body.url})
    response.redirect('/')
})

module.exports = router