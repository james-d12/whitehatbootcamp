const Crew = require('../classes/Crew');
const Person = require('../classes/Person');

describe('Crew', () => {
    test('Crew Constructor Error', () => {
        expect(() => new Crew()).toThrowError("Person must have a name!")
    });
    test('Crew Constructor Success', () => {
        expect(() => new Crew("Jack")).toBeDefined()
    })
})
