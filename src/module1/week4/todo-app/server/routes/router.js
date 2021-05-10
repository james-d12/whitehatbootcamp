const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator');

const GET = require('../services/get')

router.get('/', GET.homeRoutes);

module.exports = router