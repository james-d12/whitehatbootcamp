const express = require('express')
const router = express.Router()

const GET = require('../services/get')
const POST = require('../services/post')
const PUT = require('../services/put')

// Middleware function.
router.use(function timeLog(req, res, next) {
    next();
});

router.get('/', GET.homeRoutes);
router.get('/restaurants/add', GET.RestaurantAdd);
router.get('/restaurants/:id', GET.RestaurantRoute);
router.get('/restaurants/:id/edit', GET.RestaurantEdit);
router.get('/restaurants/:id/delete', GET.RestaurantDelete);
router.get('/users')

router.post('/restaurants/add', POST.RestaurantAdd);
router.post('/restaurants/:id/review', POST.RestaurantReviewAdd)

router.post('/users')
router.post('/users/login')

router.put('/restaurants/:id/edit', PUT.RestaurantEdit);

module.exports = router