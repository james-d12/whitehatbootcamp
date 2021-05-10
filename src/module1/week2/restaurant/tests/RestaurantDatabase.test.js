const RestaurantDatabase = require('../classes/RestaurantDatabase')

describe('Restaurant Database', () => {
    test('Restaurant Constructor Success', () => {
        const database = new RestaurantDatabase()
        
        expect(database.dbFilePath).toEqual()
    })
})