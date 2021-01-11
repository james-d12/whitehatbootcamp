const Bag = require('./Bag')

describe('Bag', () => {
    test('Bag Error', () => {
        expect(() => new Bag()).toThrow("Weight must have a value!");
        expect(() => new Bag(-10)).toThrow("Weight must be positive!");
    });
    test('Bag Weight', () => {
        const b1 = new Bag(10)
        expect(b1.weight).toEqual(10);

        const b2 = new Bag(10000)
        expect(b2.weight).toEqual(10000)
    })
});