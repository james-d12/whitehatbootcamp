const express = require('express')
const basicAuth = require("express-basic-auth");
const bcrypt = require("bcrypt");
const { checkJwt } = require("../Auth");
const User = require("../Models/User");
const Validate = require("../Validators/Validate");
const UserValidator = require("../Validators/UserValidator");

const { UniqueConstraintError } = require("sequelize");

class UserController {
    router = express.Router();
    
    constructor(){
        this.router.get('/users', checkJwt, this.usersGet);
        this.router.post('/users', checkJwt, UserValidator.usersPost(), Validate, this.usersPost);
        this.router.get('/users/:username', checkJwt, this.userGet);
        this.router.put('/users/:username', checkJwt, this.userPut);
        this.router.delete('/users/:username', checkJwt, this.userDelete);
    }

    async usersGet(req, res){
        console.info("GET Request sent to /users");
        const page = (req.query.page === undefined) ? -1 : req.query.page;
        const pageSize = (req.query.pageSize === undefined) ? 25 : req.query.pageSize;

        const users = await User.findAll({ limit: page * pageSize })
        return (users === null) ? res.status(404).send() : res.status(200).send(users);
    }

    async usersPost(req, res){
        console.info("POST Request sent to /users");
        const userData = req.body;

        try {
            const result = await User.create(userData);
            return (result === 0) ? res.status(400).send("Could not create the user.") : res.status(201).send();
        } catch (error) {
            console.error(`Error: ${error.message}.`)
            if(error instanceof UniqueConstraintError) {
                console.error("Could not create user as username is not unique!")
                return res.status(409).send("Could not create user as username is already taken!");
            } else {
                console.error("Could not create user!")
                return res.status(400).send()
            }
        }
    }

    async userGet(req, res) {
        console.info("GET Request sent to /users/:username");
        const { username } = req.params;
        const user = await User.findOne({ where: { username: username }});
        return (user === null) ? res.status(404).send(`Could not find the user with the given Username: ${username}`) : res.status(200).send(user);
    }

    async userPut(req, res) {
        console.info("PUT Request sent to /users/:username");
        const { username } = req.params;
        const userData = req.body;
        const result = await User.update(userData, { where: { username: username }})
        return (result[0] === 0) ? res.status(404).send(`Could not find the user with the given Username: ${username}`) : res.status(201).send();
    }

    async userDelete(req, res) {
        console.info("DELETE Request sent to /users/:username");
        const { username } = req.params;
        const result = await User.destroy({ where: { username: username }});
        return (result === 0) ? res.status(404).send(`Could not find the user with the given Username: ${username}`) : res.status(200).send();
    }
}

module.exports = UserController;