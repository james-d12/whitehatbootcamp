const sqlite3 = require('sqlite3').verbose();
const path = require('path')
const fsp = require('fs').promises
const Database = require('./database')

const MenuItem = require('./classes/MenuItem')
const Menu = require('./classes/Menu')
const Restaurant = require('./classes/Restaurant')
const restaurantDatabase = path.join(__dirname, "/database/restaurant.sqlite")

async function getDataFromJson(jsonFile){
    const data = await fsp.readFile(jsonFile)
    const dataParsed = JSON.parse(String(data))
    return dataParsed 
}

async function populate(databasePath){
    const restaurantJson = path.join(__dirname, "/data/restaurants.json")
    const databaseMode = sqlite3.OPEN_READWRITE
    
    const database = new Database(restaurantDatabase, databaseMode)
    
    const data = await getDataFromJson(restaurantJson)
    database.clearEntries()
    database.initialise()
    database.insert(data)
    database.close()
}

async function getTable(database, command){
    return new Promise((resolve, reject) => {
        database.db.all(command, [], (err, rows) => {
            if (err) { reject(err) }
            resolve(rows)
        });
    })
}

async function loadIntoClass(){
    console.log("Loading Data into Class Instances.")

    const databaseMode = sqlite3.OPEN_READWRITE
    const database = new Database(restaurantDatabase, databaseMode)
    
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

async function main(){
    await populate()
    const data = await loadIntoClass()
    console.log(data)
}

const databaseMode = sqlite3.OPEN_READWRITE
const database = new Database(restaurantDatabase, databaseMode)
database.populate("/data/restaurants.json")