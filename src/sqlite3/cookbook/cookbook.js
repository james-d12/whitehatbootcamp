const sqlite3 = require('sqlite3').verbose();
const Database = require('../database')
const fs = require('fs');

function readData(file, app){
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) { reject(err) }
            const fileData = JSON.parse(String(data))

            //Read Categories
            for(let i = 0; i < fileData['categories'].length; i++){
                db.queryEach(`INSERT INTO ingredient_category(category_name, category_description) VALUES("${fileData['categories'][i].name}", "${fileData['categories'][i].description}");`)
            }

            //Read Ingredients
            let ingredient
            for(let i = 0; i < fileData['ingredients'].length; i++){
                db.queryEach(`INSERT INTO ingredients(ingredient_name, category_id) VALUES("${fileData['ingredients'][i].name}", ${fileData['ingredients'][i].category});`)
            }

            //Read Measurement Units
            for(let i = 0; i < fileData['measurements'].length; i++){
                db.queryEach(`INSERT INTO measurement_units(measurement_description) VALUES("${fileData['measurements'][i].description}");`)
            }

            resolve("Done")
        })
    })
}

const cookBookFile = "./data/cookbook.json"
const db = new Database("./database/cookbook.db", sqlite3.OPEN_READWRITE)

db.queryEach('DELETE FROM ingredient_category;')
db.queryEach('DELETE FROM ingredients;') 
db.queryEach('DELETE FROM measurement_units;')
db.queryEach('DELETE FROM recipe_ingredients;')
db.queryEach('DELETE FROM recipes;')

readData(cookBookFile, db).then(
    data => {
        db.close()
    }
)