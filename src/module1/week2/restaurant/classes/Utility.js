const fsp = require('fs').promises

async function getDataFromJson(jsonFile){
    const data = await fsp.readFile(jsonFile)
    const dataParsed = JSON.parse(String(data))
    return dataParsed 
}

module.exports = { getDataFromJson }