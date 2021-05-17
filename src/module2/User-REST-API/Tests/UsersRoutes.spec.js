const app = require("../Server/Server");
const request = require('supertest')
const { createDatabase } = require("../Server/Database/CreateDatabase");
const { describe } = require("../Server/Models/User");

const admin = "admin"
const adminpass = "adminpass"

const user = "sledwitch0"
const userpass = "KaCSes0"

beforeAll(() => {
    return createDatabase();
});

describe("Users Routes", () => {
    describe("Getting All Users", () => {
        test("Should Return 200 - Can Get all Users.", async() => {
            const response = await request(app).get('/users').auth(admin, adminpass);
            expect(response.statusCode).toStrictEqual(200);
            expect(response.body.length).toBeGreaterThan(100);
        })

        test("Should Return 401 - Can Get all Users.", async() => {
            const response = await request(app).get('/users').auth(user, userpass)
            expect(response.statusCode).toStrictEqual(401);
        })

        test('Should Return 200 - Can Get Users = Page: 1; PageSize: 25.', async() => {
            const response = await request(app).get('/users/?page=1&pageSize=25').auth(admin, adminpass);
            expect(response.statusCode).toStrictEqual(200);
            expect(response.body.length).toStrictEqual(25);
        })

        test('Should Return 401 - Can Get Users = Page: 1; PageSize: 25.', async() => {
            const response = await request(app).get('/users/?page=1&pageSize=25').auth(user, userpass);
            expect(response.statusCode).toStrictEqual(401);
        })
    
        test('Should Return 200 - Can Get Users = Page: 15; PageSize: 10.', async() => {
            const response = await request(app).get('/users/?page=15&pageSize=10').auth(admin, adminpass);
            expect(response.statusCode).toStrictEqual(200);
            expect(response.body.length).toStrictEqual(150);
        })

        test('Should Return 401 - Can Get Users = Page: 15; PageSize: 10.', async() => {
            const response = await request(app).get('/users/?page=15&pageSize=10').auth(user, userpass);
            expect(response.statusCode).toStrictEqual(401);
        })
    })

    describe("Adding Users", () => {
        test("Should Return 201 - Can Create a User With a Valid Body.", async()=> {
            const data = {
                "firstname": "James",
                "lastname": "Dooban",
                "username": "jdooban123",
                "password": "randomPassword123448"
            }
            const response = await request(app).post('/users').auth(admin, adminpass)
                .send(data).set('Accept', 'application/json')
            expect(response.statusCode).toStrictEqual(201);
        })

        test("Should Return 409 - Can Create a User With a Valid Body.", async() => {
            const data = {
                "firstname":"Erasmus",
                "lastname":"Swadon",
                "username":"eswadon5",
                "password":"w95Fxpfco"
            }
            const response = await request(app).post('/users').auth(admin, adminpass)
                .send(data).set('Accept', 'application/json')
            expect(response.statusCode).toStrictEqual(409);
        })

        test("Should Return 401 - Can Create a User With a Valid Body.", async() => {
            const data = {
                "firstname": "James",
                "lastname": "Dooban",
                "username": "jdooban1233",
                "password": "randomPassword123448"
            }
            const response = await request(app).post('/users').auth(user, userpass)
                .send(data).set('Accept', 'application/json')
            expect(response.statusCode).toStrictEqual(401);
        })
    })
})

describe("User Routes", () => {
    describe("Getting a User", () => {
        test('Should Return 200 - Can Get a User with a Username.', async() => {
            const response = await request(app).get('/users/vhallitt3').auth(admin, adminpass);
            expect(response.statusCode).toStrictEqual(200);
        })
    })

    describe("Updating a User", () => {
        test('Should Return 200 - Can Update a User with a Username.', async() => {
            const data = {
                "firstname": "Hamilton",
                "lastname": "Ranaghan",
                "username": "hranaghan4",
                "password": "passwordasdasd23432"
            }
            const response = await request(app).put('/users/hranaghan4').auth(admin, adminpass)
                .send(data).set('Accept', 'application/json')
            expect(response.statusCode).toStrictEqual(200);
        })

        test('Should Return 404 - Can Update a User with a Username.', async() => {
            const data = {
                "firstname": "Hamilton",
                "lastname": "Ranaghan",
                "username": "hranaghan4",
                "password": "passwordasdasd23432"
            }
            const response = await request(app).put('/users/hranaghan43').auth(admin, adminpass)
                .send(data).set('Accept', 'application/json')
            expect(response.statusCode).toStrictEqual(404);
        })

        test('Should Return 401 - Can Update a User with a Username.', async() => {
            const data = {
                "firstname": "Hamilton",
                "lastname": "Ranaghan",
                "username": "asheldrick8",
                "password": "passwordasdasd23432"
            }
            const response = await request(app).put('/users/asheldrick8').auth(user, userpass)
                .send(data).set('Accept', 'application/json')
            expect(response.statusCode).toStrictEqual(401);
        })
    })

    describe("Deleting a User", () => {
        test('Should Return 200 - Can Delete a User with a Username.', async() => {
            const response = await request(app).delete('/users/memanson1').auth(admin, adminpass);
            expect(response.statusCode).toStrictEqual(200);
        })
    
        test('Should Return 404 - Can Delete a User with a Username.', async() => {
            const response = await request(app).delete('/users/memanson1sadasdad').auth(admin, adminpass);
            expect(response.statusCode).toStrictEqual(404);
        })
    
        test('Should Return 401 - Can Delete a User with a Username.', async() => {
            const response = await request(app).delete('/users/memanson1').auth(user, userpass);
            expect(response.statusCode).toStrictEqual(401);
        })
    })
})