const { Restaurant, Menu, MenuItem } = require('../private/models');

exports.homeRoutes = async (req, res) => {
        req.session.page_views++
        const restaurants = await Restaurant.findAll({
            include: [{model: Menu, as: 'menus'}],
            nest: true
        })
        res.render('home', {restaurants})
}

exports.RestaurantRoute = async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id)
    const reviews = await restaurant.getReviews({
        nest: true
    })
    const menus = await restaurant.getMenus({
        include: [{model: MenuItem, as: 'items'}],
        nest: true
    })
    res.render('restaurant/restaurant', {restaurant, menus, reviews})
}

exports.RestaurantAdd = async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id)
    res.render('restaurant/add', {restaurant})
}

exports.RestaurantEdit = async(req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id)
    const menus = await restaurant.getMenus({
        include: [{model: MenuItem, as: 'items'}],
        nest: true
    })
    res.render('restaurant/edit', {restaurant, menus})
}

exports.RestaurantDelete = async(req, res) => {
    Restaurant.findByPk(req.params.id).then(restaurant => {
        restaurant.destroy()
        res.redirect('/')   
    })
}

exports.UserCreate = async(req, res) => {
    res.render('user/create')
}

exports.UserLogin = async(req, res) => {
    res.render('user/login')
}


