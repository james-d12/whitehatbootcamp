const sqlite3 = require('sqlite3').verbose();
const Database = require('../database')
const fs = require('fs');

function readData(file, db){
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) { reject(err) }

            const restaurantData = JSON.parse(String(data))

            let counter = 1
            for(let i = 0; i < restaurantData.length; i++){
                const restaurant = restaurantData[i];
                db.queryEach(`INSERT INTO Restaurant(name, image_link) VALUES("${restaurant.name}", "${restaurant.image}");`)

                for(let k = 0; k < restaurantData[i]['menus'].length; k++){
                    const menu = restaurantData[i]['menus'][k]
                    db.queryEach(`INSERT INTO Menu(title, restaurant_id) VALUES("${menu.title}", ${i});`)
                    
                    for(let j = 0; j < restaurantData[i]['menus'][k].items.length; j++){
                        const item = restaurantData[i]['menus'][k].items[j]
                        db.queryEach(`INSERT INTO MenuItem(name, price, menu_id) VALUES ("${item.name}", ${item.price}, ${counter});`)
                    }
                    counter++
                }
            }

            resolve(restaurantData)
        })
    })
}

const restaurantFile = "./data/restaurants.json"
const db = new Database("./database/restaurant.sqlite", sqlite3.OPEN_READWRITE)

readData(restaurantFile, db).then(
    data => {
        db.close()
    }
)