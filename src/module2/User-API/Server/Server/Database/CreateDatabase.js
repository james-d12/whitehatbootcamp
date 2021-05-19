const fs = require("fs");
const models = require('../Models/Models');

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
    const user_file = "./Server/Database/Data/Users.json";
    const user_data = await readFile(user_file)
    await models.sequelize.sync({ force: true })
    models.User.bulkCreate(user_data);
}

module.exports = { createDatabase };