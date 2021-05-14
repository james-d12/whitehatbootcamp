const app = require("../Server/Server");
const request = require('supertest')

const { createDatabase } = require("../Server/Database/CreateDatabase");

beforeAll(() => {
    return createDatabase();
});

describe("Airports Routes", () => {
    test("Should Return 200 - Can Get all Users.", (done) => {
        request(app)
            .get('/users')
            .expect(200)
            .expect(response => {
                expect(response.body.length).toBeGreaterThan(900)
            })
            .end(done)
    })

    test('Should Return 200 - Can Get Users = Page: 1; PageSize: 25.', (done) => {
        request(app)
            .get('/users/?page=1&pageSize=25')
            .expect(200)
            .expect(response => {
                expect(response.body.length).toStrictEqual(25);
            })
            .end(done)
    })

    test('Should Return 200 - Can Get Users = Page: 15; PageSize: 10.', (done) => {
        request(app)
            .get('/users/?page=15&pageSize=10')
            .expect(200)
            .expect(response => {
                expect(response.body.length).toStrictEqual(150);
            })
            .end(done)
    })

    test('Should Return 200 - Can Get Users = Page: 150; PageSize: 75.', (done) => {
        request(app)
            .get('/users/?page=150&pageSize=75')
            .expect(200)
            .expect(response => {
                expect(response.body.length).toStrictEqual(11250);
            })
            .end(done)
    })

    test("Should Return 201 - Can Create a User.", (done) => {
        request(app)
            .post('/users')
            .send({
                "firstname": "James",
                "lastname": "Dooban",
                "username": "jdooban123",
                "password": "randomPassword123448",
            })
            .set('Accept', 'application/json')
            .expect(201)
            .end(done)
    })

    test("Should Return 400 - Can Create a User.", (done) => {
        request(app)
            .post('/airports')
            .send({
                "firstname": "James",
                "lastname": "Dooban",
                "username": "jdooban123",
                "password": "12313",
            })
            .set('Accept', 'application/json')
            .expect(400)
            .end(done)
    })
})

describe("Airport Routes", () => {
    test("Should Return 200 - Can Get a User with a Username.", (done) => {
        request(app)
            .get('/users/jchaplain1')
            .expect(200)
            .expect(response => {
                expect(response.body).toEqual({
                    "id": 2,
                    "firstname": "Jesse",
                    "lastname": "Chaplain",
                    "username": "jchaplain1",
                    "password": "HK7mq5Y5N83",
                })
            })
            .end(done)
    })

    test('Should Return 404 - Can Get a User with a Username.', (done) => {
        request(app)
        .get('/users/jchaplain1asdasd')
        .expect(404)
        .end(done)
    })

    test('Should Return 201 - Can Update a User with a Username.', (done) => {
        request(app)
            .put('/users/jchaplain1')
            .send({
                "id": 2,
                "firstname": "Jesse",
                "lastname": "Craplain",
                "username": "jchaplain1",
                "password": "HK7mq5Y5N83",
            })
            .expect(201)
            .end(done)
    })

    test('Should Return 400 - Can Update a User with a Username.', (done) => {
        request(app)
            .put('/airports/jchaplain1')
            .send({
                "id": 2,
                "firstname": "Jesse",
                "lastname": "Craplain",
                "username": "jchaplain1",
                "password": 12314,
            })
            .expect(400)
            .end(done)
    })

    test('Should Return 404 - Can Update a User with a Username.', (done) => {
        request(app)
            .put('/airports/jchaplain1asdasd')
            .send({
                "id": 2,
                "firstname": "Jesse",
                "lastname": "Craplain",
                "username": "jchaplain1",
                "password": "1231asdfaaf4",
            })
            .expect(404)
            .end(done)
    })

    test('Should Return 200 - Can Delete a User with a Username.', (done) => {
        request(app)
            .delete('/users/jchaplain1')
            .expect(200)
            .end(done)
    })

    test('Should Return 404 - Can Delete a User with a Username.', (done) => {
        request(app)
            .delete('/users/jchaplain1asdasdasd')
            .expect(404)
            .end(done)
    })
})