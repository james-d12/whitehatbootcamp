const Bike = require('./Bike')

describe('Bike', () => {
    test('Bike canRideBike With No Charge', () => {
        const b1 = new Bike(0)

        expect(b1.canRideBike(1)).toEqual(false)
        expect(b1.canRideBike(0)).toEqual(true)
        expect(b1.canRideBike(-100)).toEqual(false)
    });    
    test('Bike canRideBike When Fully Charged', () => {
        const b1 = new Bike(100)

        expect(b1.canRideBike(1)).toEqual(true)
        expect(b1.canRideBike(0)).toEqual(true)
        expect(b1.canRideBike(-100)).toEqual(true)
    });
    test('Bike useBike With No Charge', () => {
        const b1 = new Bike(0)
        b1.useBike(100)

        expect(b1.charge).toEqual(0)
    }); 
    test('Bike useBike When Fully Charged', () => {
        const b1 = new Bike(100)
        b1.useBike(100)

        expect(b1.charge).toEqual(0)
    }); 
});