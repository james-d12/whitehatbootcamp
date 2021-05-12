const app = require("../Server/Server");
const request = require('supertest')

const { createDatabase } = require("../Server/CreateDatabase");

beforeAll(() => {
    return createDatabase();
});

describe("Airports Routes", () => {
    test("Should Return 200 = Can Get all Airplanes.", (done) => {
        request(app)
            .get('/airports')
            .expect(200)
            .expect(response => {
                expect(response.body.length).toBeGreaterThan(28000)
            })
            .end(done)
    })

    test("Should Return 201 - Can Create an Airplane.", (done) => {
        request(app)
            .post('/airports')
            .send({
                "icao": "03AS",
                "iata": "",
                "name": "Random Airport",
                "city": "Juice City",
                "state": "Tomate State",
                "country": "Banana Country",
                "elevation": 1000,
                "lat": 53.23,
                "lon": 8543.3,
                "tz": "GB"
            })
            .set('Accept', 'application/json')
            .expect(201)
            .end(done)
    })

    test("Should Return 400 - Can Create an Airplane.", (done) => {
        request(app)
            .post('/airports')
            .send({
                "icao": 100,
                "iata": "",
                "name": "Random Airport",
                "city": "Juice City",
                "state": "Tomate State",
                "country": "Banana Country",
                "elevation": 1000,
                "lat": 53.23,
                "lon": 8543.3,
                "tz": "GB"
            })
            .set('Accept', 'application/json')
            .expect(400)
            .end(done)
    })
})

describe("Airport Routes", () => {
    test("Should Return 200 - Can Get an Airplane with an ICAO.", (done) => {
        request(app)
            .get('/airports/ZYXC')
            .expect(200)
            .expect(response => {
                expect(response.body).toEqual({
                    "id": 28866,
                    "icao": "ZYXC",
                    "iata": "XEN",
                    "name": "Xingcheng Air Base",
                    "city": "",
                    "state": "Liaoning",
                    "country": "CN",
                    "elevation": 30,
                    "lat": 40.5802993774,
                    "lon": 120.697998047,
                    "tz": "Asia/Shanghai"
                })
            })
            .end(done)
    })

    test('Should Return 404 - Can Get an Airplane with an ICAO.', (done) => {
        request(app)
        .get('/airports/ZYXCSDASD')
        .expect(404)
        .end(done)
    })

    test('Should Return 201 - Can Update an Airplane with an ICAO.', (done) => {
        request(app)
            .put('/airports/ZYXC')
            .send({
                "icao": "ZYXC",
                "iata": "XEN",
                "name": "Xingcheng High Air Base",
                "city": "",
                "state": "Liaoning",
                "country": "CN",
                "elevation": 30,
                "lat": 40.5802993774,
                "lon": 120.697998047,
                "tz": "Asia/Shanghai"
            })
            .expect(201)
            .end(done)
    })

    test('Should Return 400 - Can Update an Airplane with an ICAO.', (done) => {
        request(app)
            .put('/airports/ZYXC')
            .send({
                "icao": "ZYXC",
                "iata": "XEN",
                "name": "Xingcheng High Air Base",
                "city": "",
                "state": 10,
                "country": "CN",
                "elevation": 30,
                "lat": 40.5802993774,
                "lon": 120.697998047,
                "tz": "Asia/Shanghai"
            })
            .expect(400)
            .end(done)
    })

    test('Should Return 404 - Can Update an Airplane with an ICAO.', (done) => {
        request(app)
            .put('/airports/ZYXCASD')
            .send({
                "icao": "ZYXC",
                "iata": "XEN",
                "name": "Xingcheng High Air Base",
                "city": "",
                "state": "Liaoning",
                "country": "CN",
                "elevation": 30,
                "lat": 40.5802993774,
                "lon": 120.697998047,
                "tz": "Asia/Shanghai"
            })
            .expect(404)
            .end(done)
    })

    test('Should Return 200 - Can Delete an Airplane with an ICAO.', (done) => {
        request(app)
            .delete('/airports/ZYXC')
            .expect(200)
            .end(done)
    })

    test('Should Return 404 - Can Delete an Airplane with an ICAO.', (done) => {
        request(app)
            .delete('/airports/ZYXCASDASD')
            .expect(404)
            .end(done)
    })
})