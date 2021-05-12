const express = require('express')
const router = express.Router()
const { check, validationResult, param } = require('express-validator');
const Airport = require("../Models/Airport");
const Plane = require("../Models/Plane");

router.get('/airports', async(req, res) => {
    const airports = await Airport.findAll({
        include: [{model: Plane, as: 'planes'}],
        nest: true
    })

    return (airports === null) ? res.status(404).send() : res.status(200).send(airports);
})

router.get('/planes', async(req, res) => {
    const planes = await Planes.findAll();
    return (planes === null) ? res.status(404).send() : res.status(200).send(planes);
})

router.post(
    '/airports',
    check('icao').isString().not().isEmpty(),
    check('iata').isString(),
    check('name').isString().not().isEmpty(),
    check('city').isString(),
    check('state').isString(),
    check('country').isString().not().isEmpty(),
    check('elevation').isNumeric().not().isEmpty(),
    check('lat').isNumeric().not().isEmpty(),
    check('lon').isNumeric().not().isEmpty(),
    check('tz').isString().not().isEmpty(),
    
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
    check('icao').isString().not().isEmpty(),
    check('iata').isString(),
    check('name').isString().not().isEmpty(),
    check('city').isString(),
    check('state').isString(),
    check('country').isString().not().isEmpty(),
    check('elevation').isNumeric().not().isEmpty(),
    check('lat').isNumeric().not().isEmpty(),
    check('lon').isNumeric().not().isEmpty(),
    check('tz').isString().not().isEmpty(),

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

module.exports = router;