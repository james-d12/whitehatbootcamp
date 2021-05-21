const express = require('express')
const { checkJwt } = require("../Auth");
const User = require("../Models/User");
const Validate = require("../Validators/Validate");
const UserValidator = require("../Validators/UserValidator");

const { UniqueConstraintError } = require("sequelize");

/**
 * Controls the routes for a specific user.
 */
class UserController {
    router = express.Router();
    
    constructor(){
        this.router.get('/users/:email/account', checkJwt, this.accountGet);
        this.router.post('/users/:email/account/sync', checkJwt, this.accountSync);
        this.router.post('/users/:email/account', checkJwt, UserValidator.accountPost(), this.accountGet);
        this.router.post('/users/:email/transfer/:email_to', checkJwt, UserValidator.transferPost(), this.transferPost);
    }

    async accountSync(req, res) {
        console.info("POST Request sent to /users/:email/account/sync");
        const { email } = req.params;
        const userData = req.body;
        const exists = await User.findOne({ where: { email: email }})

        // User does not exist
        if(exists === null){
            console.warn(`No User found with email: ${email}.`);
            console.info(`Creating new User with email: ${email}.`);
            await User.create(userData);
            res.status(201).send();
        } else {
            console.warn(`User with Email ${email} already exists!`);
            res.status(200).send();
        }
    }

    async accountGet(req, res) {
        console.info("GET Request sent to /users/:email/account");
        const { email } = req.params;
        const user = await User.findOne({ where: { email: email }});
        return (user === null) ? res.status(404).send(`Could not find the user with the given Email: ${email}`) : res.status(200).send(user);
    }

    async accountPost(req, res) {
        console.info("POST Request sent to /users/:email/account");
        const { email } = req.params;
        const userData = req.body;
        const result = await User.update(userData, { where: { email: email }})
        return (result[0] === 0) ? res.status(404).send(`Could not find the user with the given Username: ${username}`) : res.status(201).send();
    }

    async transferPost(req, res) {
        console.info("POST Request sent to /users/:email/transfer/:email_to");
        const { email, email_to } = req.params;
        const { money } = req.body;
        const user = await User.findOne({ where: { email: email }});
        const userTo = await User.findOne({ where: { email: email_to }});

        if(user && userTo){
            user.update("money", money);

            const currentMoney = user.getDataValue("money");
            const newMoney = currentMoney - money;
            await user.update("money", newMoney);
            
            const transferredMoney = userTo.getDataValue("money") + money;
            await userTo.update("money", transferredMoney)
            
            return res.status(201).send("Transfered Money to account");
        } else {
            return res.status(404).send(`Could not find the user with the given Email: ${email}`)
        }
  }

}

module.exports = UserController;