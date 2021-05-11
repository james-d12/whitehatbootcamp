const express = require('express')
const { body, validationResult } = require('express-validator');
const app = express()
const swaggerUi = require('swagger-ui-express')
const airports = require('./resources/airports.json')
const YAML = require('js-yaml')
const fs = require('fs');
const { param } = require('express-validator');
const docs = YAML.load(fs.readFileSync('./resources/airports-config.yaml').toString())
const swaggerDocs = require('swagger-jsdoc')({
    swaggerDefinition: docs,
    apis: ['./server.js', "./airport.js", "./plane.js" ]
})

let airportsData = JSON.parse(fs.readFileSync("./resources/airports.json"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, {explorer: true}))


/**
* @swagger
* /airports:
*   get:
*     summary: returns an array of airports
*     responses:
*       200:
*         description: all the airports
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Airport'                 
*/
app.get('/airports', (req, res) => {
    console.log("GET - Airport")
    res.send(airports)
})

/**
* @swagger
* /airports:
*   post:
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             properties:
*               icao:
*                 type: string
*               iata:
*                 type: string
*               name: 
*                 type: string
*               city:
*                 type: string
*               state:
*                 type: string
*               country:
*                 type: string
*               elevation:
*                 type: number
*               latitude:
*                 type: number
*               longitude:
*                 type: number
*               tz:
*                 type: string
*     summary: adds an airport.
*     responses:
*       200:
*         description: all the airports
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Airport'                 
*/
app.post(
    '/airports', 
    body('icao').isString().not().isEmpty(),
    body('iata').isString(),
    body('name').isString().not().isEmpty(),
    body('city').isString().not().isEmpty(),
    body('state').isString().not().isEmpty(),
    body('country').isString().not().isEmpty(),
    body('elevation').isNumeric().not().isEmpty(),
    body('latitude').isNumeric().not().isEmpty(),
    body('longitude').isNumeric().not().isEmpty(),
    body('tz').isString().not().isEmpty(),

    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const file = "./resources/airports.json"
        const body = JSON.stringify(req.body, null, 4);

        airportsData.push(body);
        console.log(airportsData[airportsData.length-2]);
        console.log(airportsData[airportsData.length-1]);

        //fs.appendFile(file, body, (err) => {
        //    if (err) res.status(500);
        //    else { res.status(200) }
        //})
        res.send(); 
    }
)

app.get(
    '/airports/:icao', 
    param('icao').isString(),
    (req, res) => {
        const { icao } = req.params;
        
        let resultAirport = {
            "icao": "",
            "iata": "",
            "name": "",
            "city": "",
            "state": "",
            "country": "",
            "elevation": 0,
            "latitude": 0,
            "longitude": 0,
            "tz": ""
        };
        for (const airport of Object.entries(airportsData)) {
            if(airport[1].icao === icao){
                console.log(`Found airport with ICAO: ${icao}!`);
                resultAirport = airport;
            }
        }

        return (resultAirport === null) ? res.status(404).send(resultAirport) : res.status(200).send(resultAirport);
    }
)

app.patch(
    "/airports/:icao",
    body('icao').isString().not().isEmpty(),
    body('iata').isString(),
    body('name').isString().not().isEmpty(),
    body('city').isString().not().isEmpty(),
    body('state').isString().not().isEmpty(),
    body('country').isString().not().isEmpty(),
    body('elevation').isNumeric().not().isEmpty(),
    body('latitude').isNumeric().not().isEmpty(),
    body('longitude').isNumeric().not().isEmpty(),
    body('tz').isString().not().isEmpty(),
    (req, res) => {
        let updated = false;
        let updatedAirport = null;
        const { icao } = req.params;
        const newAirportData = req.body;
        
        for (let airport of Object.entries(airportsData)) {
            if(airport[1].icao === icao){
                console.log(`Updating airport with ICAO: ${icao}!`);
                airport = newAirportData
                updatedAirport = airport;
                updated = true;
            }
        }

        return (updated === true) ? res.status(200).send(updatedAirport) : res.status(404).send(updatedAirport);
    }    
)

app.listen(3000, () => console.log("Airport API ready. Documents at http://localhost:3000/api-docs"))