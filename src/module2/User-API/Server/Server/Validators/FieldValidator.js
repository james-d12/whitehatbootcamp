const { body } = require("express-validator");

class FieldValidator {
    static firstname =  body('firstname')
    .isLength({ min: 2, max: 64 })
    .withMessage("Firstname must be between 2 - 64 characters long!")
    .isString()
    .withMessage("Firstname must be a string!")

    static lastname =  body('lastname')
    .isLength({ min: 2, max: 64 })
    .withMessage("Lastname must be between 2 - 64 characters long!")
    .isString()
    .withMessage("Lastname must be a string!")

    static username =  body('username')
    .isLength({ min: 6, max: 24 })
    .withMessage("Username must be between 6 - 24 characters long!")
    .isString()
    .withMessage("Username must be a string!")

    static password = body('password')
    .isLength({ min: 8, max: 64 })
    .withMessage("Password must be at least 8 characters!")
    .isString()
    .withMessage("Password must be a string!")
}

module.exports = FieldValidator;