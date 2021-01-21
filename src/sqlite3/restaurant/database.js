const sqlite3 = require('sqlite3').verbose();
const path = require('path')
const { getDataFromJson } = require('./utility')

class Database {
    constructor(dbFilePath, mode){
        this.dbFilePath = dbFilePath
        this.mode = mode 

        this.db = new sqlite3.Database(this.dbFilePath, this.mode, (err) => {
            if (err) {
                console.log(`Could not connect to the database: ${err.message}`)
            } else{
                console.log('Connected to the database.')
            }
        })
    }

    clearEntries(){
        console.log("Clearing Entries in Database.")
        this.queryEach('DELETE FROM Menu;')
        this.queryEach('DELETE FROM MenuItem;') 
        this.queryEach('DELETE FROM Restaurant;')
    }

    initialise(){
        console.log("Initialising Tables in Database.")
        this.queryEach('CREATE TABLE IF NOT EXISTS Restaurant(id INTEGER NOT NULL PRIMARY KEY, name TEXT NOT NULL, image_link TEXT);')
        this.queryEach('CREATE TABLE IF NOT EXISTS Menu(id INTEGER NOT NULL PRIMARY KEY, title TEXT NOT NULL, restaurant_id INTEGER NOT NULL, FOREIGN KEY(restaurant_id) REFERENCES Restaurant(id));')
        this.queryEach('CREATE TABLE IF NOT EXISTS MenuItem(id INTEGER NOT NULL PRIMARY KEY, name TEXT NOT NULL, price INTEGER, menu_id INTEGER NOT NULL, FOREIGN KEY(menu_id) REFERENCES Menu(id));')
    }

    insert(data){
        console.log("Inserting Data into the Database.")
        let counter = 1
        for(let i = 0; i < data.length; i++){
            const restaurant = data[i];
            const menus = data[i]['menus']
            this.queryEach(`INSERT INTO Restaurant(name, image_link) VALUES("${restaurant.name}", "${restaurant.image}");`)
    
            for(let k = 0; k < menus.length; k++){
                const menu = menus[k]
                const menuItems = menus[k].items 
                this.queryEach(`INSERT INTO Menu(title, restaurant_id) VALUES("${menu.title}", ${i+1});`)
                
                for(let j = 0; j < menuItems.length; j++){
                    const item = menuItems[j]
                    this.queryEach(`INSERT INTO MenuItem(name, price, menu_id) VALUES ("${item.name}", ${item.price}, ${counter});`)
                }
                counter++
            }
        }
    }

    async populate(jsonFile){
        const file = path.join(__dirname, jsonFile)
        const data = await getDataFromJson(file)

        this.clearEntries()
        this.initialise()
        this.insert(data)
    }

    queryEach(sqlCommand){
        this.db.serialize(() => {
            this.db.each(sqlCommand, (err, row) => {
                if(err) { console.log(err.message) }
                console.log(row)
            });
        });
    }

    prepare(sqlCommand){
        return this.db.prepare(sqlCommand)
    }

    close(){    
        this.db.close((err) => {
            if (err) {
              return console.error(err.message);
            }
            console.log('Closed the database connection.');
        });
    }
}

module.exports = Database