const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator');

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
router.get('/users/create', GET.UserCreate)
router.get('/users/login', GET.UserLogin)


router.post(
    '/restaurants/add', 
    check('name').isLength({min: 3, max: 30}).isString().trim().escape(),
    check('image').isURL().not().isEmpty().trim().escape(),
    POST.RestaurantAdd
) 

router.post(
    '/restaurants/:id/review',
    check('name').isLength({min: 3, max: 30}).isString().trim().escape(),
    check('rating').isFloat({min: 1, max: 5}).isNumeric().not().isEmpty().trim().escape(),
    check('comment').isLength({min: 3, max: 300}).isString().trim().escape(),
    POST.RestaurantReviewAdd
)

router.post('/users/create', POST.UserCreate)
router.post('/users/login', POST.UserLogin)

router.put('/restaurants/:id/edit', PUT.RestaurantEdit);

module.exports = router