const Passenger = require('../classes/Passenger')
const Plane = require('../classes/Plane')

describe('Plane', () => {
    test('Plane Board Passengers', () => {
        const p = new Plane("Heathrow Airport", "Luton Airport", "0A2FD")
        const pa1 = new Passenger("Jake")
        const pa2 = new Passenger("Jack")
        p.boardPassengers([pa1, pa2])

        expect(p.passengers).toHaveLength(2)
        expect(p.passengers[0]).toStrictEqual(pa1)
        expect(p.passengers[1]).toStrictEqual(pa2)

    })
    test('Plane Board Passenger', () => {
        const p = new Plane("Heathrow Airport", "Luton Airport", "0A2FD")
        const pa1 = new Passenger("Harry")
        p.boardPassenger(pa1)

        expect(p.passengers).toHaveLength(1)
        expect(p.passengers[0]).toStrictEqual(pa1)
    })

});