const express = require('express')
const router = express.Router()

const gServices = require('../services/get')
const pServices = require('../services/post')

router.use(function timeLog(req, res, next) {
    console.log('Running Router....')
    next();
});

router.get('/', gServices.homeRoutes);
router.get('/restaurants/add', gServices.RestaurantAdd);
router.get('/restaurants/:id', gServices.RestaurantRoute);
router.get('/restaurants/:id/edit', gServices.RestaurantEdit);
router.get('/restaurants/:id/delete', gServices.RestaurantDelete);

router.post('/restaurants/add', pServices.RestaurantAdd);
router.post('/restaurants/:id/edit', pServices.RestaurantEdit);

module.exports = router