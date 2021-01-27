const { Restaurant, Menu, MenuItem } = require('../private/models');

exports.RestaurantAdd = async (req, res) => {
    const body = req.body;
    await Restaurant.create({name: body.name, image: body.url})
    res.redirect('/')
}

exports.RestaurantEdit = async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id)
    const body = req.body 
    restaurant.update({name: body.name, image: body.url})
    res.redirect('/');
}
