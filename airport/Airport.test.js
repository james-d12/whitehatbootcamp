const Airport = require('./Airport');
const Plane = require('./Plane');

describe('Airport', () => {
    test('Airport Land', () => {
        const p = new Plane("Heathrow Airport", "Luton Airport", "0A2DF4")
        const h = new Airport("Heathrow Airport")

        h.landPlane(p)

        expect(h.numOfPlanes()).toEqual(1)
    })
});