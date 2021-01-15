const Utility = require('../classes/Utility')

expect.extend({
    toBeWithinRange(received, floor, ceiling) {
      const pass = received >= floor && received <= ceiling;
      if (pass) {
        return {
          message: () =>
            `expected ${received} not to be within range ${floor} - ${ceiling}`,
          pass: true,
        };
      } else {
        return {
          message: () =>
            `expected ${received} to be within range ${floor} - ${ceiling}`,
          pass: false,
        };
      }
    },
});

describe('Utility', () => {
    test('Utility Generate ID', () => {
        const id = Utility.generateID(6)
        expect(id.length).toEqual(6)
    })
    test('Utility Random', () => {
        const rand = Utility.random(0, 100)
        expect(rand).toBeWithinRange(0, 100)
    })
})
