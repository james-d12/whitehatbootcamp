const Passenger = require('../classes/Passenger')
const Plane = require('../classes/Plane')

describe('Plane', () => {
    test('Plane Add Passengers', () => {
        const p = new Plane("Heathrow Airport", "Luton Airport", "0A2FD")
        const pa = new Passenger("James")
        const pa2 = new Passenger("Harry")

        p.addPassengers(pa, pa2)
        
        expect(p.numOfPasengers)

    })

});