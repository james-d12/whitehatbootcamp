const fsp = require('fs').promises

const MenuItem = require('./MenuItem')
const Menu = require('./Menu')
const Restaurant = require('./Restaurant')

async function getDataFromJson(jsonFile){
    const data = await fsp.readFile(jsonFile)
    const dataParsed = JSON.parse(String(data))
    return dataParsed 
}

function clearDatabase(database){
    console.log("Clearing Entries in Database.")
    database.queryEach('DELETE FROM Menu;')
    database.queryEach('DELETE FROM MenuItem;') 
    database.queryEach('DELETE FROM Restaurant;')
}

function initialiseTables(database){
    console.log("Initialising Tables in Database.")
    database.queryEach('CREATE TABLE IF NOT EXISTS Restaurant(id INTEGER NOT NULL PRIMARY KEY, name TEXT NOT NULL, image_link TEXT);')
    database.queryEach('CREATE TABLE IF NOT EXISTS Menu(id INTEGER NOT NULL PRIMARY KEY, title TEXT NOT NULL, restaurant_id INTEGER NOT NULL, FOREIGN KEY(restaurant_id) REFERENCES Restaurant(id));')
    database.queryEach('CREATE TABLE IF NOT EXISTS MenuItem(id INTEGER NOT NULL PRIMARY KEY, name TEXT NOT NULL, price INTEGER, menu_id INTEGER NOT NULL, FOREIGN KEY(menu_id) REFERENCES Menu(id));')
}

function insertIntoDatabase(data, database){
    console.log("Inserting Data into the Database.")
    let counter = 1
    for(let i = 0; i < data.length; i++){
        const restaurant = data[i];
        const menus = data[i]['menus']
        database.queryEach(`INSERT INTO Restaurant(name, image_link) VALUES("${restaurant.name}", "${restaurant.image}");`)

        for(let k = 0; k < menus.length; k++){
            const menu = menus[k]
            const menuItems = menus[k].items 
            database.queryEach(`INSERT INTO Menu(title, restaurant_id) VALUES("${menu.title}", ${i+1});`)
            
            for(let j = 0; j < menuItems.length; j++){
                const item = menuItems[j]
                database.queryEach(`INSERT INTO MenuItem(name, price, menu_id) VALUES ("${item.name}", ${item.price}, ${counter});`)
            }
            counter++
        }
    }

    
}

async function getTable(database, command){
    return new Promise((resolve, reject) => {
        database.db.all(command, [], (err, rows) => {
            if (err) { reject(err) }
            resolve(rows)
        });
    })
}

async function loadIntoClass(database){
    console.log("Loading Data into Class Instances.")

    let restaurantsList = []
    const restaurants = await getTable(database, 'SELECT * FROM Restaurant')

    for(let i = 0; i < restaurants.length; i++){
        const r = restaurants[i]
        const restaurant = new Restaurant(r.name, r.image_link)
        const menus = await getTable(database, `SELECT * FROM Menu WHERE restaurant_id = ${r.id};`)
        
        for(let k = 0; k < menus.length; k++){
            const m = menus[k]
            const menu = new Menu(m.title, m.restaurant_id)
            const menuItems = await getTable(database, `SELECT * FROM MenuItem WHERE menu_id=${m.id};`)

            for(let j = 0; j < menuItems.length; j++){
                const mI = menuItems[j]
                const item = new MenuItem(mI.name, mI.price, mI.menu_id)
                
                menu.addMenuItem(item)
            }

            restaurant.addMenu(menu)
        }
        restaurantsList.push(restaurant)
    }
    return restaurantsList
}

module.exports = { getDataFromJson, clearDatabase, initialiseTables, insertIntoDatabase, getTable, loadIntoClass }