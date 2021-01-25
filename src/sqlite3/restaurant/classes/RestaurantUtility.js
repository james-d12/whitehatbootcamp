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

    const deleteTableRestaurant = database.prepare('DELETE FROM Restaurant;')
    const deleteTableMenu = database.prepare('DELETE FROM Menu;')
    const deleteTableMenuItem = database.prepare('DELETE FROM MenuItem;')

    try{
        deleteTableRestaurant.run() 
        deleteTableMenu.run()
        deleteTableMenuItem.run() 
    }
    finally {
        deleteTableRestaurant.finalize()
        deleteTableMenuItem.finalize() 
        deleteTableMenu.finalize()
    }

}

function initialiseTables(database){
    console.log("Initialising Tables in Database.")

    const createTableRestaurant = database.prepare('CREATE TABLE IF NOT EXISTS Restaurant(id INTEGER NOT NULL PRIMARY KEY, name TEXT NOT NULL, image_link TEXT);')
    const createTableMenu = database.prepare('CREATE TABLE IF NOT EXISTS Menu(id INTEGER NOT NULL PRIMARY KEY, title TEXT NOT NULL, restaurant_id INTEGER NOT NULL, FOREIGN KEY(restaurant_id) REFERENCES Restaurant(id));')
    const createTableMenuItem = database.prepare('CREATE TABLE IF NOT EXISTS MenuItem(id INTEGER NOT NULL PRIMARY KEY, name TEXT NOT NULL, price INTEGER, menu_id INTEGER NOT NULL, FOREIGN KEY(menu_id) REFERENCES Menu(id));')        

    try{
        createTableRestaurant.run() 
        createTableMenu.run() 
        createTableMenuItem.run()
    } 
    finally {
        createTableRestaurant.finalize() 
        createTableMenu.finalize() 
        createTableMenuItem.finalize()
    }
}

function insertIntoDatabase(data, database){
    console.log("Inserting Data into the Database.")

    const insertIntoRestaurant = database.prepare(`INSERT INTO Restaurant(name, image_link) VALUES(?, ?);`)
    const insertIntoMenu = database.prepare(`INSERT INTO Menu(title, restaurant_id) VALUES(?, ?);`)
    const insertIntoMenuItem = database.prepare(`INSERT INTO MenuItem(name, price, menu_id) VALUES (?, ?, ?);`)

    try{
        let counter = 1
        for(let i = 0; i < data.length; i++){
            const restaurant = data[i];
            const menus = data[i]['menus']
            insertIntoRestaurant.run(restaurant.name, restaurant.image)
    
            for(let k = 0; k < menus.length; k++){
                const menu = menus[k]
                const menuItems = menus[k].items 
                insertIntoMenu.run(menu.title, (i+1))
                
                for(let j = 0; j < menuItems.length; j++){
                    const item = menuItems[j]
                    insertIntoMenuItem.run(item.name, item.price, counter)
                }
                counter++
            }
        }
    }
    finally {
        insertIntoRestaurant.finalize()
        insertIntoMenuItem.finalize()
        insertIntoMenu.finalize()
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
                const menuItem = menuItems[j]
                const item = new MenuItem(menuItem.name, menuItem.price, menuItem.menu_id)
                
                menu.addMenuItem(item)
            }

            restaurant.addMenu(menu)
        }
        restaurantsList.push(restaurant)
    }
    return restaurantsList
}

module.exports = { getDataFromJson, clearDatabase, initialiseTables, insertIntoDatabase, getTable, loadIntoClass }