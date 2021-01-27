const { Restaurant, Menu, MenuItem } = require('../private/models');
const { app } = require('./setup')

app.post('/restaurants/:id/edit', async (request, response) => {
    const restaurant = await Restaurant.findByPk(request.params.id)
    const body = request.body 

    restaurant.update({name: body.name, image: body.url})
    response.redirect('/');
})

app.post('/restaurants/add', async(request, response) => {
    const body = request.body;
    await Restaurant.create({name: body.name, image: body.url})
    response.redirect('/')
})
