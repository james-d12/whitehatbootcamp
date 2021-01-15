const Customer = require('../classes/Customer')
const ElectricScooter = require('../classes/ElectricScooter')
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
    test('Customer Constructor Defaults', () => {
        const c = new Customer()
        expect(c.firstName).toEqual("")
        expect(c.lastName).toEqual("")
        expect(c.fullName).toEqual(" ")
        expect(c.money).toEqual(0)
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
    test('Customer Can Purchase Scooter', () => {
        const c = new Customer("Harry", "Ronald", 100)
        c.purchaseScooter(new Scooter(10))
        expect(c.scooter).toBeDefined()
        expect(c.money).toEqual(90)
    })
    test('Customer Cannot Purchase Scooter', () => {
        const c = new Customer("Harry", "Ronald", 0)
        c.purchaseScooter(new Scooter(10))
        expect(c.scooter).toBeUndefined()
        expect(c.money).toEqual(0)
    })
    test('Customer Return Scooter', () => {
        const c = new Customer("Harry", "Ronald", 100)
        c.purchaseScooter(new Scooter(10))
        c.returnScooter()
        expect(c.scooter).toBeUndefined()
        expect(c.money).toEqual(90)
    })
    test('Customer Return No Scooter', () => {
        const c = new Customer("Harry", "Ronald", 0)
        c.returnScooter()
        expect(c.scooter).toBeUndefined()
        expect(c.money).toEqual(0)
    })
    test('Customer Drive Distance', () => {
        const c = new Customer("Harry", "Ronald", 100)
        c.purchaseScooter(new ElectricScooter(100, 100))
        c.driveScooterFor(100)
        expect(c.scooter.chargeLevel).toEqual(95)
    })
    test('Customer Drive Distance Too Far', () => {
        const c = new Customer("Harry", "Ronald", 100)
        c.purchaseScooter(new ElectricScooter(100, 10))
        c.driveScooterFor(250)
        expect(c.scooter.chargeLevel).toEqual(10)
    })
    test('Customer Drive Distance With No Scooter', () => {
        const c = new Customer("Harry", "Ronald", 100)
        c.driveScooterFor(250)
        expect(c.scooter).toBeUndefined
    })
    test('Customer Has Scooter', () => {
        const c = new Customer("Harry", "Ronald", 100)
        c.purchaseScooter(new ElectricScooter(100, 10))
        expect(c.hasScooter()).toBeTruthy()
    })
    test('Customer Has No Scooter', () => {
        const c = new Customer("Harry", "Ronald", 100)
        expect(c.hasScooter()).toBeFalsy()
    })

})
