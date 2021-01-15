const Customer = require('../classes/Customer')
const Scooter = require('../classes/Scooter')

describe('Customer', () => {
    test('Customer Constructor Success', () => {
        const c = new Customer("Harry", "Ronald", 100)
        expect(c.firstName).toEqual("Harry")
        expect(c.lastName).toEqual("Ronald")
        expect(c.fullName).toEqual("Harry Ronald")
        expect(c.money).toEqual(100)
        expect(c.scooter).toBeUndefined()
    })
    test('Customer Can Afford Scooter', () => {
        const c = new Customer("Harry", "Ronald", 100)
        const s = new Scooter(50)
        expect(c.canAffordScooter(s)).toBeTruthy()
    })
    test('Customer Cannot Afford Scooter', () => {
        const c = new Customer("Harry", "Ronald", 0)
        const s = new Scooter(50)
        expect(c.canAffordScooter(s)).toBeFalsy()
    })
    test('Customer Purchase Scooter', () => {
        const c = new Customer("Harry", "Ronald", 100)
        c.purchaseScooter(new Scooter(10))
        expect(c.scooter).toBeDefined()
        expect(c.money).toEqual(90)
    })
})
