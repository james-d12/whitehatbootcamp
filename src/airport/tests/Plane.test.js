const Passenger = require('../classes/Passenger')
const Crew = require('../classes/Crew')
const Plane = require('../classes/Plane')

describe('Plane', () => {

    test('Plane Constructor Error', () => {
        expect(() => new Plane("Heathrow", "Luton")).toThrowError("Plane must have a flight number!")
    })

    test('Plane Add Passengers', () => {
        const p = new Plane("Heathrow Airport", "Luton Airport", "0A2FD")
        const pa = new Passenger("James")
        const pa2 = new Passenger("Harry")

        p.addPassengers(pa, pa2)
        
        expect(p.numOfPasengers()).toEqual(2)
    })

    test('Plane Add Crew', () => {
        const p = new Plane("Heathrow Airport", "Luton Airport", "0A2FD")
        const cm1 = new Crew("James")
        const cm2 = new Crew("Harry")

        p.addCrew(cm1, cm2)
        
        expect(p.numOfCrew()).toEqual(2)
    })

    test('Board Plane', () => {
        const p = new Plane("Heathrow Airport", "Luton Airport", "0A2FD")
        const cm1 = new Crew("Michelle")
        const pa1 = new Passenger("Harry")

        p.addCrew(cm1)
        p.addPassengers(pa1)

    })

});