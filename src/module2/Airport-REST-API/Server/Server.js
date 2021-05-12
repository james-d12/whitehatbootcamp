const express = require('express')
const app = express()
const swaggerUi = require('swagger-ui-express')
//const airports = require('./Database/Data/Airports.json')
const router = require("./Routes/Router");
const YAML = require('js-yaml')
const fs = require('fs');
const docs = YAML.load(fs.readFileSync('./Server/Database/Data/Airport-Config.yaml').toString())
const swaggerDocs = require('swagger-jsdoc')({
    swaggerDefinition: docs,
    apis: ['./server.js' ]
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, {explorer: true}))
app.use(router);

module.exports = app;