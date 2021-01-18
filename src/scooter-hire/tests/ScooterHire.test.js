const Utility = require('../classes/Utility')
const Customer = require('../classes/Customer')
const ElectricScooter = require('../classes/ElectricScooter')
const ScooterHire = require('../classes/ScooterHire')

jest.useFakeTimers();

describe('ScooterHire', () => {
    test('ScooterHire Constructor', () => {
        const sh = new ScooterHire()

        expect(sh.scooters).toHaveLength(0)
        expect(sh.scootersAvailable).toHaveLength(0)
        expect(Object.keys(sh.currentlyHired)).toHaveLength(0)

    })
    test('ScooterHire Add Scooter Fully Charged', () => {
        const sh = new ScooterHire()

        sh.addScooter(new ElectricScooter(10, 100))
        expect(sh.scooters).toHaveLength(1)
        expect(sh.scootersAvailable).toHaveLength(1)
    })
    test('ScooterHire Add Scooter No Charge', () => {
        const sh = new ScooterHire()

        sh.addScooter(new ElectricScooter(10, 0))
        expect(sh.scooters).toHaveLength(1)
        expect(sh.scootersAvailable).toHaveLength(0)
    })
    test('ScooterHire Add Scooters Fully Charged', () => {
        const sh = new ScooterHire()

        const scooters = []
        scooters.push(new ElectricScooter(10, 100))
        scooters.push(new ElectricScooter(10, 100))

        sh.addScooters(scooters)

        expect(sh.scooters).toHaveLength(2)
        expect(sh.scootersAvailable).toHaveLength(2)
    })
    test('ScooterHire Hire Scooter To Customer Available', () => {
        const c = new Customer("James", "Durban", 100)
        const sh = new ScooterHire()
        const sc = new ElectricScooter(50, 100)
        
        sh.addScooter(sc)
        expect(sh.scootersAvailable).toHaveLength(1)
        sh.hireScooterTo(c)

        expect(sh.scootersAvailable).toHaveLength(0)
        expect(sh.currentlyHired["James Durban"]).toEqual(sc.id)
    })
    test('ScooterHire Hire Scooter To Customer None Available.', () => {
        const c = new Customer("James", "Durban", 100)
        const sh = new ScooterHire()
        const sc = new ElectricScooter(50, 50)
        
        sh.addScooter(sc)
        expect(sh.scootersAvailable).toHaveLength(0)
        sh.hireScooterTo(c)

        expect(sh.scootersAvailable).toHaveLength(0)
        expect(Object.keys(sh.currentlyHired)).toHaveLength(0)
    })
    test('ScooterHire Hire Scooter To Customer Cannot Afford', () => {
        const c = new Customer("James", "Durban", 0)
        const sh = new ScooterHire()
        const sc = new ElectricScooter(50, 100)
        
        sh.addScooter(sc)
        expect(sh.scootersAvailable).toHaveLength(1)
        sh.hireScooterTo(c)
        expect(sh.scootersAvailable).toHaveLength(1)
        expect(Object.keys(sh.currentlyHired)).toHaveLength(0)
    })
    test('ScooterHire Return Scooter From Customer', () => {
        const c = new Customer("James", "Durban", 100)
        const sh = new ScooterHire()
        const sc = new ElectricScooter(50, 100)
        sh.addScooter(sc)

        expect(sh.scootersAvailable).toHaveLength(1)
        sh.hireScooterTo(c)
        expect(sh.scootersAvailable).toHaveLength(0)
        sh.returnScooterFrom(c)
        expect(sh.scootersAvailable).toHaveLength(1)
    })
})
