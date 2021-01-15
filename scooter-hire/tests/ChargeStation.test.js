const ChargeStation = require('../classes/ChargeStation')

describe('Charge Station', () => {
    test('Charge Station Get Nearest Equal', () => {
        const cs = new ChargeStation("Hackney Road Charging Station", 100, 123)
        const cs2 = new ChargeStation("Tower Bridge Charging Station", 100, 123)

        const nearest = cs.getNearestChargingStation(10, 20)
        expect(nearest).toStrictEqual(cs)
    })
    test('Charge Station Get Nearest One Equal', () => {
        const cs = new ChargeStation("Hackney Road Charging Station", 100, 123)
        const cs2 = new ChargeStation("Some Other Charging Station", 100, 10)

        const nearest = cs.getNearestChargingStation(100, 25)
        expect(nearest).toStrictEqual(cs2)
    })
    test('Charge Station Get Nearest', () => {
        const cs = new ChargeStation("Hackney Road Charging Station", 100, 123)
        const cs2 = new ChargeStation("Tower Bridge Charging Station", 15, 23)

        const nearest = cs.getNearestChargingStation(10, 20)
        expect(nearest).toStrictEqual(cs2)
    })
})
