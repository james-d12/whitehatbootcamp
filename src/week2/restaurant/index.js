const path = require('path')
const sqlite3 = require('sqlite3').verbose();
const RestaurantDatabase = require('./classes/RestaurantDatabase')
const { getDataFromJson, clearDatabase, initialiseTables, insertIntoDatabase, loadIntoClass } = require('./classes/RestaurantUtility')

async function main(){
    const databaseMode = sqlite3.OPEN_READWRITE

    const location = process.env.NODE_ENV === 'test' ? ':memory:' : path.join(__dirname, "/database/restaurant.sqlite")
    const databaseFile = location
    const dataFile = path.join(__dirname, "/data/restaurants.json")
    const database = new RestaurantDatabase(databaseFile, databaseMode)
    const data = await getDataFromJson(dataFile)
    
    await database.connect()
    clearDatabase(database)
    initialiseTables(database)
    insertIntoDatabase(data, database)
    const restaurants = await loadIntoClass(database)
    database.close()
}

async function retrieveDataFromSQL(){
    const databaseMode = sqlite3.OPEN_READWRITE
    const databaseFile = process.env.NODE_ENV === 'test' ? ':memory:' : path.join(__dirname, "/database/restaurant.sqlite")
    const database = new RestaurantDatabase(databaseFile, databaseMode)

    await database.connect()
    return await loadIntoClass(database)
}

module.exports = { retrieveDataFromSQL }