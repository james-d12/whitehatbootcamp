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
    test('Electric Scooter Cannot Drive For', () => {
        const s = new ElectricScooter()
        expect(s.canDriveFor(100)).toBeFalsy()
    })
})
