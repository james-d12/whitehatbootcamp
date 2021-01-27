const { Restaurant, Menu, MenuItem } = require('../private/models');

exports.homeRoutes = async (req, res) => {
    const restaurants = await Restaurant.findAll({
        include: [{model: Menu, as: 'menus'}],
        nest: true
    })
    res.render('home', {restaurants})
}

exports.RestaurantRoute = async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id)
    const menus = await restaurant.getMenus({
        include: [{model: MenuItem, as: 'items'}],
        nest: true
    })
    res.render('restaurant/restaurant', {restaurant, menus})
}

exports.RestaurantAdd = async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id)
    res.render('restaurant/add', {restaurant})
}


