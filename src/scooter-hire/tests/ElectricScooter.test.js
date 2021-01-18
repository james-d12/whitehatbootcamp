const ElectricScooter = require('../classes/ElectricScooter')

describe('Electric Scooter', () => {
    test('Electric Scooter Constructor Success', () => {
        const cost = 10
        const charge = 96
        const s = new ElectricScooter(cost, charge)

        expect(s).toBeDefined()
        expect(s.cost).toEqual(cost)
        expect(s.chargeLevel).toEqual(charge)
    })
    test('Electric Scooter Constructor Default', () => {
        const s = new ElectricScooter()
        expect(s).toBeDefined()
        expect(s.cost).toEqual(0)
        expect(s.chargeLevel).toEqual(0)
    })
    test('Electric Scooter Can Drive For', () =>{
        const s = new ElectricScooter(10, 100)
        expect(s.canDriveFor(100)).toBeTruthy()
    })
    test('Electric Scooter Can Drive For Extreme', () =>{
        const s = new ElectricScooter(10, 100)
        expect(s.canDriveFor(1000)).toBeTruthy()
        
    })
    test('Electric Scooter Cannot Drive For', () => {
        const s = new ElectricScooter()
        expect(s.canDriveFor(100)).toBeFalsy()
    })
    test('Electric Scooter Set Charge Level Within Bounds', () => {
        const s = new ElectricScooter(0,0)
        s.setChargeLevel(75)
        expect(s.chargeLevel).toEqual(75)
    })
    test('Electric Scooter Set Charge Level Under Bounds', () => {
        const s = new ElectricScooter(0,50)
        s.setChargeLevel(-10)
        expect(s.chargeLevel).toEqual(0)
    })
    test('Electric Scooter Set Charge Level Over Bounds', () => {
        const s = new ElectricScooter(0,0)
        s.setChargeLevel(1000)
        expect(s.chargeLevel).toEqual(100)
    })
    test('Electric Scooter Drive', () => {
        const s = new ElectricScooter(10, 100)
        s.drive(100000)
        expect(s.chargeLevel).toEqual(0)
    })
})
