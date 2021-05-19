const express = require('express')
const router = express.Router()
const { check, query, validationResult, param } = require('express-validator');
const Airport = require("../Models/Airport");
const Plane = require("../Models/Plane");s

router.get(
    '/airports', 
    //query('page', "Page query must be a positive integer!").isInt({ gt: 0 }),
    //query('pageSize', "Page Size query must be a positive integer!").isInt({ gt: 0 }),
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const page = (req.query.page === undefined) ? -1 : req.query.page;
        const pageSize = (req.query.pageSize === undefined) ? 25 : req.query.pageSize;

        const airports = await Airport.findAll({
            limit: page * pageSize,
            include: [{model: Plane, as: 'planes'}],
            nest: true
        })

        return (airports === null) ? res.status(404).send() : res.status(200).send(airports);
    }
)

router.get('/planes', async(req, res) => {
    const planes = await Planes.findAll();
    return (planes === null) ? res.status(404).send() : res.status(200).send(planes);
})

router.post(
    '/airports',
    check('icao', "ICAO must be a string and not empty!").isString().not().isEmpty(),
    check('iata', "IATA must be a string!").isString(),
    check('name', "Name must be a string and not empty!").isString().not().isEmpty(),
    check('city', "City must be a string!").isString(),
    check('state', "State must be a string!").isString(),
    check('country', "Country must be a string and not empty!").isString().not().isEmpty(),
    check('elevation', "Elevation must be numeric and not empty!").isNumeric().not().isEmpty(),
    check('lat', "Latitude must be numeric and not empty!").isNumeric().not().isEmpty(),
    check('lon', "Longitude must be numeric and not empty!").isNumeric().not().isEmpty(),
    check('tz', "Timezone must be a string and not empty!").isString().not().isEmpty(),
    
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        
        const airportData = req.body;
        const result = await Airport.create(airportData);
        return (result === 0) ? res.status(500).send("Could not create the airport.") : res.status(201).send();
    }
)

router.get(
    '/airports/:icao',
    async(req, res) => {
        const { icao } = req.params;
        const airport = await Airport.findOne({ where: { icao: icao }});
        return (airport === null) ? res.status(404).send(`Could not find the airport with the given ICAO: ${icao}`) : res.status(200).send(airport);
    }
)

router.put(
    '/airports/:icao',
    check('icao', "ICAO must be a string and not empty!").isString().not().isEmpty(),
    check('iata', "IATA must be a string!").isString(),
    check('name', "Name must be a string and not empty!").isString().not().isEmpty(),
    check('city', "City must be a string!").isString(),
    check('state', "State must be a string!").isString(),
    check('country', "Country must be a string and not empty!").isString().not().isEmpty(),
    check('elevation', "Elevation must be numeric and not empty!").isNumeric().not().isEmpty(),
    check('lat', "Latitude must be numeric and not empty!").isNumeric().not().isEmpty(),
    check('lon', "Longitude must be numeric and not empty!").isNumeric().not().isEmpty(),
    check('tz', "Timezone must be a string and not empty!").isString().not().isEmpty(),

    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const { icao } = req.params;
        const airportData = req.body;
        const result = await Airport.update(airportData, { where: { icao: icao }})
        return (result[0] === 0) ? res.status(404).send(`Could not find the airport with the given ICAO: ${icao}`) : res.status(201).send();
    }
)

router.delete(
    '/airports/:icao',

    async(req, res) => {
        const { icao } = req.params;
        const result = await Airport.destroy({ where: { icao: icao }});
        return (result === 0) ? res.status(404).send(`Could not find the airport with the given ICAO: ${icao}`) : res.status(200).send();
    }
)

router.get(
    '/airports/:icao/planes',
    
    async(req, res) => {
        const { icao } = req.params;
        const airport = await Airport.findOne({
            include: [{model: Plane, as: 'planes'}],
            nest: true,
        },{ where: { icao: icao }})


        return (airport === null) ? res.status(404).send() : res.status(200).send(airport);
    }
)

module.exports = router;