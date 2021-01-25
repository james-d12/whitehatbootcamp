const MenuItem = require('./MenuItem')
const Menu = require('./Menu')
const Restaurant = require('./Restaurant')
const sqlite3 = require('sqlite3').verbose();

class RestaurantDatabase {
    constructor(dbFilePath="", mode=""){
        this.dbFilePath = dbFilePath
        this.mode = mode 
        this.db = undefined
    }

    connect(){
        if(this.db != undefined) { return; }

        return new Promise((resolve, reject) => {
            this.db = new sqlite3.Database(this.dbFilePath, this.mode, (err) => {
                if (err) { console.log(`Could not connect to the database`); reject(err.message); }
                    
                console.log('Connected to the database.')
                resolve('Connected to the database.')
            })
        })
    }

    clearTables(){
        console.log("Clearing Tables in Restaurant Database.")

        const deleteTableRestaurant = this.prepare('DELETE FROM Restaurant;')
        const deleteTableMenu = this.prepare('DELETE FROM Menu;')
        const deleteTableMenuItem = this.prepare('DELETE FROM MenuItem;')
    
        try{
            deleteTableRestaurant.run() 
            deleteTableMenu.run()
            deleteTableMenuItem.run() 
        } finally {
            deleteTableRestaurant.finalize()
            deleteTableMenuItem.finalize() 
            deleteTableMenu.finalize()
        }
    }

    initialiseTables(){
        console.log("Initialising Tables in Restaurant Database.")

        const createTableRestaurant = this.prepare('CREATE TABLE IF NOT EXISTS Restaurant(id INTEGER NOT NULL PRIMARY KEY, name TEXT NOT NULL, image_link TEXT);')
        const createTableMenu = this.prepare('CREATE TABLE IF NOT EXISTS Menu(id INTEGER NOT NULL PRIMARY KEY, title TEXT NOT NULL, restaurant_id INTEGER NOT NULL, FOREIGN KEY(restaurant_id) REFERENCES Restaurant(id));')
        const createTableMenuItem = this.prepare('CREATE TABLE IF NOT EXISTS MenuItem(id INTEGER NOT NULL PRIMARY KEY, name TEXT NOT NULL, price INTEGER, menu_id INTEGER NOT NULL, FOREIGN KEY(menu_id) REFERENCES Menu(id));')        
    
        try{
            createTableRestaurant.run() 
            createTableMenu.run() 
            createTableMenuItem.run()
        } finally {
            createTableRestaurant.finalize() 
            createTableMenu.finalize() 
            createTableMenuItem.finalize()
        }
    }

    insertData(data){
        console.log("Inserting Data into the Restaurant Database.")

        const insertIntoRestaurant = this.prepare(`INSERT INTO Restaurant(name, image_link) VALUES(?, ?);`)
        const insertIntoMenu = this.prepare(`INSERT INTO Menu(title, restaurant_id) VALUES(?, ?);`)
        const insertIntoMenuItem = this.prepare(`INSERT INTO MenuItem(name, price, menu_id) VALUES (?, ?, ?);`)

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
        } finally {
            insertIntoRestaurant.finalize()
            insertIntoMenuItem.finalize()
            insertIntoMenu.finalize()
        }
    }

    async queryGet(sqlCommand){
        return new Promise((resolve, reject) => {
            this.db.all(sqlCommand, [], (err, rows) => {
                if (err) { reject(err) }
                resolve(rows)
            });
        })
    }

    async retrieveRestaurants(sqlCommand='SELECT * FROM Restaurant'){
        console.log("Retrieving all data from Restaurant Database.")

        let restaurantsList = []
        const restaurants = await this.queryGet(sqlCommand)
    
        for(let i = 0; i < restaurants.length; i++){
            const r = restaurants[i]
            const restaurant = new Restaurant(r.id, r.name, r.image_link)
            const menus = await this.queryGet(`SELECT * FROM Menu WHERE restaurant_id = ${r.id};`)
            
            for(let k = 0; k < menus.length; k++){
                const m = menus[k]
                const menu = new Menu(m.title, m.restaurant_id)
                const menuItems = await this.queryGet(`SELECT * FROM MenuItem WHERE menu_id=${m.id};`)
    
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

    async retrieveMenus(sqlCommand='SELECT * FROM Menu'){
        console.log("Retrieving all data from Restaurant Database.")

        let menuList = []
        const restaurants = await this.queryGet(sqlCommand)
    
        for(let i = 0; i < restaurants.length; i++){
            const menus = await this.queryGet(`SELECT * FROM Menu WHERE restaurant_id = ${restaurants[i].id};`)
            
            for(let k = 0; k < menus.length; k++){
                const m = menus[k]
                const menu = new Menu(m.title, m.restaurant_id)
                const menuItems = await this.queryGet(`SELECT * FROM MenuItem WHERE menu_id=${m.id};`)
    
                for(let j = 0; j < menuItems.length; j++){
                    const menuItem = menuItems[j]
                    const item = new MenuItem(menuItem.name, menuItem.price, menuItem.menu_id)
                    
                    menu.addMenuItem(item)
                }
                menuList.push(menu)
            }
        }
        return menuList
    }

    async retrieveMenuItems(sqlCommand='SELECT * FROM MenuItem'){
        console.log("Retrieving all data from Restaurant Database.")

        let menuItemList = []
        const restaurants = await this.queryGet(sqlCommand)
    
        for(let i = 0; i < restaurants.length; i++){
            const menus = await this.queryGet(`SELECT * FROM Menu WHERE restaurant_id = ${restaurants[i].id};`)
            
            for(let k = 0; k < menus.length; k++){
                const menuItems = await this.queryGet(`SELECT * FROM MenuItem WHERE menu_id=${menus[k].id};`)
    
                for(let j = 0; j < menuItems.length; j++){
                    const menuItem = menuItems[j]
                    const item = new MenuItem(menuItem.name, menuItem.price, menuItem.menu_id)
                    menuItemList.push(menuItem)
                }
            }
        }
        return menuItemList
    }

    prepare(sqlCommand){
        return this.db.prepare(sqlCommand)
    }

    close(){    
        this.db.close((err) => {
            if (err) { return console.error(err.message); }
            console.log('Closed the database connection.');
        });
    }

}

module.exports = RestaurantDatabase
