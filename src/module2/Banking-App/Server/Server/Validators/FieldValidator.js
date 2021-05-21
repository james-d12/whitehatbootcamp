const { body } = require("express-validator");

class FieldValidator {
    static money = body('money')
    .notEmpty()
    .withMessage("Money must not be empty!")
    .isNumeric()
    .withMessage("Money must be numerical!")

    static email = body('email')
    .isLength({ min: 6, max: 64 })
    .withMessage("Email must be between 6 - 64 characters long!")
    .isEmail()
    .withMessage("Email must be in a valid email format!")
}

module.exports = FieldValidator;