const models = require("./models")
const fs = require("fs");

async function insertData(data) {
    await models.sequelize.sync({ force: true })

    let menuCounter = 1;
    for (let i = 0; i < data.length; i++) {
        const currentRestaurant = data[i];
        await models.Restaurant.create({name: currentRestaurant.name, image: currentRestaurant.image})

        for (let j = 0; j < currentRestaurant.menus.length; j++) {
            const currentMenu = currentRestaurant.menus[j]
            await models.Menu.create({title: currentMenu.title, restaurant_id: i+1})

            for (let k = 0; k < currentMenu.items.length; k++) {
                const currentMenuItem = currentMenu.items[k]
                await models.MenuItem.create ({name: currentMenuItem.name, price: currentMenuItem.price, menu_id: menuCounter})
            }
            menuCounter++;
        }
    }
}

fs.readFile("./restaurants.json", (err, data) => {
    if (err) throw new Error(err);

    const parsedData = JSON.parse(data);

    insertData(parsedData);
});