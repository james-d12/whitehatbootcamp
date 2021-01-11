const Passenger = require('./Passenger')
const Plane = require('./Plane')

describe('Plane', () => {
    test('Plane Board', () => {
        const p = new Plane("Heathrow Airport", "Luton Airport", "0A2FD")
        p.boardPassengers([
            new Passenger("Jake"),
            new Passenger("Jack")
        ])

        expect(p.numOfPasengers()).toEqual(2)
        expect(p.passengers[0].name).toEqual("Jake")
        expect(p.passengers[1].name).toEqual("Jack")
    })
});