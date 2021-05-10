const path = require('path');
const { ModifierFlags } = require('typescript');
const sqlite3 = require('sqlite3').verbose();
const RestaurantDatabase = require('./classes/RestaurantDatabase')

const databaseMode = sqlite3.OPEN_READWRITE
const databaseFile = process.env.NODE_ENV === 'test' ? ':memory:' : path.join(__dirname, "/database/restaurant.sqlite")
const restaurant_database = new RestaurantDatabase(databaseFile, databaseMode)


module.exports = { restaurant_database }