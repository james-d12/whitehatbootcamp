const sequelize = require("../Server/Models/Config");
const Plane = require("../Server/Models/Plane");

const { createDatabase } = require("../Server/CreateDatabase");

beforeAll(() => {
    return createDatabase();
});

test('Should Create a Plane.', async () => {
    const planeData = {
        origin: "London",
        destination: "Santa's Grotto",
        flight_number: "P23OOASD-ASD"
    }
    
    const plane = await Plane.create(planeData);
    const planeFound = await Plane.findOne({ where: { flight_number: planeData.flight_number }});

    expect(plane).toBeDefined();
    expect(planeFound).toBeDefined();

    expect(plane.origin).toStrictEqual(planeFound.origin);
    expect(plane.destination).toStrictEqual(planeFound.destination);
    expect(plane.flight_number).toStrictEqual(planeFound.flight_number);
})