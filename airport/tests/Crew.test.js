const Crew = require('../classes/Crew')

describe('Crew', () => {
    test('Crew Constructor', () => {
        expect(() => new Crew()).toThrowError("Person must have a name!")
        expect(() => new Crew("Jack")).toBeDefined()
    });
})
