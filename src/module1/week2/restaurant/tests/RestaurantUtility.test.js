const RestaurantDatabase = require('../classes/RestaurantDatabase')
const { getDataFromJson, clearDatabase, initialiseTables, insertIntoDatabase, loadIntoClass } = require('./classes/RestaurantUtility')

describe('Restaurant Utility', () => {
    test('Restaurant Constructor Success', () => {
        const database = new RestaurantDatabase()
        
        expect(database.dbFilePath).toEqual()
    })
})