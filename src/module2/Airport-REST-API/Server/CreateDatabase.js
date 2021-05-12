const fs = require("fs");
const models = require('./Models/Models');

function readFile(file){
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject(`error whilst reading ${file}.`)
            const parsedData = JSON.parse(data)
            return resolve(parsedData)
        })
    })
}

async function createDatabase(){
    const airport_file = "./Server/Database/Data/Airports.json";
    const plane_file = "./Server/Database/Data/Planes.json";

    const airport_data = await readFile(airport_file)
    const plane_data = await readFile(plane_file);

    await models.sequelize.sync({ force: true })

    models.Airport.bulkCreate(airport_data);
    models.Plane.bulkCreate(plane_data);
}

module.exports = { createDatabase };