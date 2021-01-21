const sqlite3 = require('sqlite3').verbose();
const path = require('path')
const fsp = require('fs').promises
const Database = require('./database')

async function getDataFromJson(jsonFile){
    const data = await fsp.readFile(jsonFile)
    const dataParsed = JSON.parse(String(data))
    return dataParsed 
}

async function populate(){
    const restaurantJson = path.join(__dirname, "/data/restaurants.json")
    const restaurantDatabase = path.join(__dirname, "/database/restaurant.sqlite")
    const databaseMode = sqlite3.OPEN_READWRITE
    
    const database = new Database(restaurantDatabase, databaseMode)
    
    const data = await getDataFromJson(restaurantJson)
    database.clearEntries()
    database.initialise()
    database.insert(data)
    database.close()
}

populate()