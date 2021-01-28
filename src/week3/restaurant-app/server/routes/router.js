const express = require('express')
const router = express.Router()

const gServices = require('../services/get')
const pServices = require('../services/post')

// Middleware function.
router.use(function timeLog(req, res, next) {
    next();
});

router.get('/', gServices.homeRoutes);
router.get('/restaurants/add', gServices.RestaurantAdd);
router.get('/restaurants/:id', gServices.RestaurantRoute);
router.get('/restaurants/:id/edit', gServices.RestaurantEdit);
router.get('/restaurants/:id/delete', gServices.RestaurantDelete);
router.get('/users')

router.post('/restaurants/add', pServices.RestaurantAdd);
router.post('/restaurants/:id/edit', pServices.RestaurantEdit);
router.post('/users')
router.post('/users/login')


module.exports = router