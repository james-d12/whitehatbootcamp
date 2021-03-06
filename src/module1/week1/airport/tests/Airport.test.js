const Plane = require('../classes/Plane');
const Airport = require('../classes/Airport');

describe('Airport', () => {
    test('Airport Land Plane', () => {
        const p = new Plane("Heathrow Airport", "Luton Airport", "0A2DF4")
        const h = new Airport("Heathrow Airport")
        h.landPlane(p)
        expect(h.numOfPlanes()).toEqual(1)
    })

    test('Airport Take Off Plane', () => {
        const p = new Plane("Heathrow Airport", "Luton Airport", "0A2DF4")
        const h2 = new Airport("Luton Airport")
        const h = new Airport("Heathrow Airport")
        h.landPlane(p)
        expect(h.planes).toHaveLength(1)
        h.takeOffPlane(p)
        expect(h.planes).toHaveLength(0)
        expect(h2.planes[0].flightNumber).toEqual("0A2DF4")
    })
    test('Airport Find Airport', () => {
        const h = new Airport("Heathrow Airport")
        expect(h.findAirport("Heathrow Airport")).toBeInstanceOf(Airport)
    })
    test('Airport Find Airport Error', () => {
        const h = new Airport("Heathrow Airport")
        expect(h.findAirport("asdads")).toBeInstanceOf(Error)
    })

    test('Airport Info Undefined', async() => {
        const CDG = new Airport('INVALID')
        const airport = await CDG.getInfo()
    })
    test('Airport City Info', async () => {
        const CDG = new Airport('CDG')
        const airport = await CDG.getInfo()
        expect(airport.city).toEqual('Paris')
    })

    test('Airport Country Info', async () =>{
        const LHR = new Airport('LHR')
        const airport = await LHR.getInfo()
        expect(airport.country).toEqual('GB')
    })

    test('Airport Timezone Info', async () =>{
        const STD = new Airport('STD')
        const airport = await STD.getInfo()
        expect(airport.tz).toEqual('America/Caracas')
    })


});