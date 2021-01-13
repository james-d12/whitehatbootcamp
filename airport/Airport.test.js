const Plane = require('./Plane');
const Airport = require('./Airport');

describe('Airport', () => {
    test('Airport Land', () => {
        const p = new Plane("Heathrow Airport", "Luton Airport", "0A2DF4")
        const h = new Airport("Heathrow Airport")
        h.landPlane(p)
        expect(h.numOfPlanes()).toEqual(1)
    })

    test('Airport Take Off', () => {
        const p = new Plane("Heathrow Airport", "Luton Airport", "0A2DF4")
        const h = new Airport("Heathrow Airport")
        h.landPlane(p)
        expect(h.planes).toHaveLength(1)
        h.takeOffPlane(p)
        expect(h.planes).toHaveLength(0)
    })

    test('Airport Find', () => {
        const p = new Plane("Heathrow Airport", "Luton Airport", "0A2DF4")
        const h1 = new Airport("LHR")
        const h2 = new Airport("LLA")
        expect(h1.findAirport("LLA")).toStrictEqual(h2)

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