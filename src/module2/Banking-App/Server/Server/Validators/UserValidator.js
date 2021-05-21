const FieldValidator = require("./FieldValidator");

class UserValidator {

    static accountSync() {
        console.info("Running Validator for /users/:email/account/sync POST")
        return [
            FieldValidator.email,
            FieldValidator.money
        ]
    }

    static accountPost() {
        console.info("Running Validator for /users/:username/account POST")
        return [
            FieldValidator.email,
            FieldValidator.money
        ]
    }

    static transferPost() {
        console.info("Running Validator for /users/:username/transfer/:username_to POST")
        return [
            FieldValidator.money
        ]
    }

}

module.exports = UserValidator;