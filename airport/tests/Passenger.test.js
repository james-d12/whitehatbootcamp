const Bag = require('../classes/Bag');
const Passenger = require('../classes/Passenger')

describe('Passenger', () => {
    test('Passenger Data', () => {
        const p1 = new Passenger("James")
        expect(p1.name).toEqual("James")
    })

    test('Passenger Add Bag', () => {
        const p1 = new Passenger("James")
        p1.addBag(new Bag(100))

        expect(p1.numOfBags()).toEqual(1)
        expect(p1.bags[0].weight).toEqual(100)
    })

    test('Passenger Remove Bag', () => {
        const p1 = new Passenger("James")
        const b1 = new Bag(100)
        p1.addBag(b1)
        expect(p1.numOfBags()).toEqual(1)
        expect(p1.bags[0].weight).toEqual(100)
        p1.removeBag(b1)
        expect(p1.numOfBags()).toEqual(0)
        expect(p1.bags[0]).toBeUndefined()
    })

});

