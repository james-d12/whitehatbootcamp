const { validationResult } = require("express-validator");

const Validate = (req, res, next) => {
    console.info("Running validation middleware.")
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    } else {
        const extractedErrors = []
        errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
        return res.status(400).json({ errors: extractedErrors})
    }
}

module.exports = Validate;