const Scooter = require('../classes/Scooter')

describe('Scooter', () => {
    test('Scooter Constructor Success', () => {
        const cost = 10
        const s = new Scooter(cost)
        expect(s).toBeDefined()
        expect(s.cost).toEqual(cost)
    })
    test('Scooter Constructor Success Defaults', () => {
        const s = new Scooter()
        expect(s).toBeDefined()
        expect(s.cost).toEqual(0)
    })
})
