const sequelize = require("../Server/Models/Config");
const Airport = require("../Server/Models/Airport");

const { createDatabase } = require("../Server/CreateDatabase");

beforeAll(() => {
    return createDatabase();
});
  
test('Should Create an Airport.', async () => {
    const airportData = {
        icao: "03AS",
        iata: "",
        name: "Random Airport",
        city: "Juice City",
        state: "Tomate State",
        country: "Banana Country",
        elevation: 1000,
        lat: 53.23,
        lon: 8543.3,
        tz: "GB"
    }
    
    const airport = await Airport.create(airportData);
    const airportFound = await Airport.findOne({ where: { icao: airportData.icao }});

    expect(airport).toBeDefined();
    expect(airportFound).toBeDefined();

    expect(airport.icao).toStrictEqual(airportFound.icao);
    expect(airport.iata).toStrictEqual(airportFound.iata);
    expect(airport.name).toStrictEqual(airportFound.name);
    expect(airport.city).toStrictEqual(airportFound.city);
    expect(airport.state).toStrictEqual(airportFound.state);
    expect(airport.country).toStrictEqual(airportFound.country);
    expect(airport.elevation).toStrictEqual(airportFound.elevation);
    expect(airport.lat).toStrictEqual(airportFound.lat);
    expect(airport.lon).toStrictEqual(airportFound.lon);
    expect(airport.tz).toStrictEqual(airportFound.tz);
})

test('Should Read an Airport.', async() => {
    const airportData = {
        icao: "ZYXC",
        iata: "XEN",
        name: "Xingcheng Air Base",
        city: "",
        state: "Liaoning",
        country: "CN",
        elevation: 30,
        lat: 40.5802993774,
        lon: 120.697998047,
        tz: "Asia/Shanghai"
    }

    const airport = await Airport.findOne({ where: { icao: airportData.icao }});

    expect(airport).toBeDefined();
    expect(airport.icao).toStrictEqual(airportData.icao);
    expect(airport.iata).toStrictEqual(airportData.iata);
    expect(airport.name).toStrictEqual(airportData.name);
    expect(airport.city).toStrictEqual(airportData.city);
    expect(airport.state).toStrictEqual(airportData.state);
    expect(airport.country).toStrictEqual(airportData.country);
    expect(airport.elevation).toStrictEqual(airportData.elevation);
    expect(airport.lat).toStrictEqual(airportData.lat);
    expect(airport.lon).toStrictEqual(airportData.lon);
    expect(airport.tz).toStrictEqual(airportData.tz);
})

test('Should Update an Airport.', async() => {
    const airportData = {
        icao: "ZYYJ",
        iata: "YNJ",
        name: "Yanji Chaoyangchuan Airport",
        city: "Yanji",
        state: "Jilin",
        country: "CN",
        elevation: 624,
        lat: 42.8828010559,
        lon: 129.451004028,
        tz: "Asia/Shanghai"
    }

    const airport = await Airport.findOne({ where: { icao: airportData.icao }});
    await Airport.update(airportData, { where: { icao: airportData.icao }});
    const airportFound = await Airport.findOne({ where: { icao: airportData.icao }});

    expect(airport).toBeDefined();
    expect(airportFound).toBeDefined();

    expect(airport.icao).toStrictEqual(airportFound.icao);
    expect(airport.iata).toStrictEqual(airportFound.iata);
    expect(airport.name).toStrictEqual(airportFound.name);
    expect(airport.city).toStrictEqual(airportFound.city);
    expect(airport.state).toStrictEqual(airportFound.state);
    expect(airport.country).toStrictEqual(airportFound.country);
    expect(airport.elevation).toStrictEqual(airportFound.elevation);
    expect(airport.lat).toStrictEqual(airportFound.lat);
    expect(airport.lon).toStrictEqual(airportFound.lon);
    expect(airport.tz).toStrictEqual(airportFound.tz);
})

test('Should Delete an Airport.', async() => {
    const icao = "ZYXC"

    const airport = await Airport.findOne({ where: { icao: icao }});
    await Airport.destroy({ where: { icao: icao }})
    const airportFound = await Airport.findOne({ where: { icao: icao }}); 

    expect(airport).toBeDefined();
    expect(airportFound).toBeNull();
})