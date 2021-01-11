const Passenger = require('./Passenger')

describe('Passenger', () => {
    test('Passenger Error', () => {
        expect(() => new Passenger()).toThrowError("Passenger must have a name!");
    });

    test('Passenger Data', () => {
        const p1 = new Passenger("James")
        expect(p1.name).toEqual("James")
    })

});

