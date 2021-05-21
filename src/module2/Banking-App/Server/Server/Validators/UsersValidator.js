const FieldValidator = require("./FieldValidator");

class UsersValidator {
    static usersPost() {
        console.info("Running Validator for /users POST")
        return [
            FieldValidator.email,
            FieldValidator.money
        ]
    }

    static userPut() {
        return [
            FieldValidator.email,
            FieldValidator.money
        ]
    }
}

module.exports = UsersValidator;