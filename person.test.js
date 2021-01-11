const person = require('./person');

describe('person', () => {

    test('William Data', () => {
        expect(person.william.firstName).toEqual('William');
        expect(person.william.lastName).toEqual('Windsor');
        expect(person.william.parents[0]).toEqual(person.diana)
        expect(person.william.parents[1]).toEqual(person.charles)
    });
    test('Charles Data', () => {
        expect(person.charles.firstName).toEqual('Charles');
        expect(person.charles.lastName).toEqual('Windsor');
        expect(person.william.parents[0]).toEqual(person.philip)
        expect(person.william.parents[1]).toEqual(person.elizabeth)
    });
    test('Diana Data', () => {
        expect(person.diana.firstName).toEqual('Diana');
        expect(person.diana.lastName).toEqual('Spencer');
    });
    test('Elizabeth Data', () => {
        expect(person.elizabeth.firstName).toEqual('Elizabeth');
        expect(person.elizabeth.lastName).toEqual('Windsor');
    });    
    test('Philip Data', () => {
        expect(person.philip.firstName).toEqual('Philip');
        expect(person.philip.lastName).toEqual('Windsor');
    });
});
