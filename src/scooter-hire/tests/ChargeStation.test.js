const ChargeStation = require('../classes/ChargeStation')
const ElectricScooter = require('../classes/ElectricScooter')
const Scooter = require('../classes/Scooter')

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

    test('Charge Station Get Station', () => {
        const cs = new ChargeStation("Unique Station", 100, 123)

        const station = cs.getChargingStation("Unique Station")
        expect(station).toStrictEqual(cs)
    })

    test('Charge Station Add Scooter Needs Charging', () => {
        const cs = new ChargeStation("Hackney Road Charging Station", 100, 123)
        const scooter = new ElectricScooter(10, 90)
        cs.addScooter(scooter)

        expect(cs.scootersCharging.length).toEqual(1)
        expect(cs.scootersCharging[0]).toStrictEqual(scooter)
    })
    test('Charge Station Add Scooter Fully Charged', () => {
        const cs = new ChargeStation("Hackney Road Charging Station", 100, 123)
        const scooter = new ElectricScooter(10, 100)
        cs.addScooter(scooter)

        expect(cs.scootersCharging.length).toEqual(0)
        expect(cs.scootersCharging[0]).toBeUndefined()
    })
})
