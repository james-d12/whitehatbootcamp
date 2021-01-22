const path = require('path')
const sqlite3 = require('sqlite3').verbose();
const RestaurantDatabase = require('./classes/RestaurantDatabase')
const { getDataFromJson, clearDatabase, initialiseTables, insertIntoDatabase, loadIntoClass } = require('./classes/RestaurantUtility')

async function main(){
    const databaseMode = sqlite3.OPEN_READWRITE
    const databaseFile = path.join(__dirname, "/database/restaurant.sqlite")
    const dataFile = path.join(__dirname, "/data/restaurants.json")
    const database = new RestaurantDatabase(databaseFile, databaseMode)
    const data = await getDataFromJson(dataFile)
    
    database.connect()
    clearDatabase(database)
    initialiseTables(database)
    insertIntoDatabase(data, database)
    const restaurants = await loadIntoClass(database)
    database.close()
}

main()