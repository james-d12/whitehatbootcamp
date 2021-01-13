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
        const h = new Airport("Heathrow Airport")
        h.landPlane(p)
        expect(h.planes).toHaveLength(1)
        h.takeOffPlane(p)
        expect(h.planes).toHaveLength(0)
    })

    test('Airport Find Airport That Exists', () => {
        const p = new Plane("Heathrow Airport", "Luton Airport", "0A2DF4")
        const h1 = new Airport("LHR")
        const h2 = new Airport("LLA")

        const result = h1.findAirport("LLA")
        expect(result).toStrictEqual(h2)
    })

    test('Airport Find Airport That Doesnt Exist', () => {
        const p = new Plane("Heathrow Airport", "Luton Airport", "0A2DF4")
        const h1 = new Airport("LHR")
        const h2 = new Airport("LLA")

        const result = h1.findAirport("LLL")
        expect(result).toBeInstanceOf(Error)
    })

    test('Airport GetInfo That Exists', async () => {
        const AIR = new Airport("London Heathrow Airport")
        const result = await AIR.getInfo()
        expect(result.name).toEqual("London Heathrow Airport")
    })

    test('Airport GetInfo That Doesnt Exist', async () => {
        const AIR = new Airport("airport that doesnt exist")
        const result = await AIR.getInfo()
        expect(result.name).toEqual("")
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