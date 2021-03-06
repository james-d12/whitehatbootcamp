const { Restaurant, Menu, MenuItem } = require('../private/models');

exports.RestaurantEdit = async (req, res) => {
    const body = req.body

    //Get restaurant and update.
    const restaurant = await Restaurant.findByPk(req.params.id)
    await restaurant.update({name: body.name, image: body.image})

    //Get the menus and update.
    const menus = await restaurant.getMenus()
    let counter = 0
    for(const key in body.menus){
        const menu = menus[Number(key)]
        console.log(menu)
        await menu.update({title: body.menus[key]})
        counter++
    }

    res.redirect('/');
}