const FieldValidator = require("./FieldValidator");

class UserValidator {
    static usersPost() {
        console.info("Running Validator for /users POST")
        return [
            FieldValidator.firstname,
            FieldValidator.lastname,
            FieldValidator.username,
            FieldValidator.password
        ]
    }

    static userPut() {
        return [
            FieldValidator.firstname,
            FieldValidator.lastname,
            FieldValidator.username,
            FieldValidator.password
        ]
    }
}

module.exports = UserValidator;