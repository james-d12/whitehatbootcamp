const Person = require('../classes/Person')

describe('Person', () => {
    test('Person Constructor', () => {
        expect(() => new Person()).toThrowError("Person must have a name!");
    });
})
