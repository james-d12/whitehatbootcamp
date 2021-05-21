const app = require("../Server/Server");
const request = require('supertest')
const { createDatabase } = require("../Server/Database/CreateDatabase");
const { describe } = require("../Server/Models/User");

beforeAll(() => {
    return createDatabase();
});

describe("User Routes", () => {
    describe("Getting a User", () => {
        test('Should Return 200 - Can Get a User with a Username.', async() => {
            const response = await request(app).get('/users/vhallitt3').auth(admin, adminpass);
            expect(response.statusCode).toStrictEqual(200);
        })
    })

})