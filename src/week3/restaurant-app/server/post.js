const { Restaurant, Menu, MenuItem } = require('../private/models');
const { app } = require('./setup')

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
