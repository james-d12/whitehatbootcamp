const express = require('express')
const router = express.Router()
const { check, query, validationResult } = require('express-validator');
const User = require("../Models/User");

router.get(
    '/users', 
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const page = (req.query.page === undefined) ? -1 : req.query.page;
        const pageSize = (req.query.pageSize === undefined) ? 25 : req.query.pageSize;

        const users = await User.findAll({ limit: page * pageSize })
        return (users === null) ? res.status(404).send() : res.status(200).send(users);
    }
)

router.post(
    '/users',
    check('firstname', "Firstname must be a string and not empty!").isString().not().isEmpty(),
    check('lastname', "Lastname must be a string and not empty!").isString().not().isEmpty(),
    check('username', "Username must be a string and not empty!").isString().not().isEmpty(),
    check('password', "Password must be a string and at least 12 characters long!").isLength({ min: 12, max: 64 }).isString(),
    
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        
        const userData = req.body;
        const result = await User.create(userData);
        return (result === 0) ? res.status(500).send("Could not create the user.") : res.status(201).send();
    }
)

router.get(
    '/users/:username',
    async(req, res) => {
        const { username } = req.params;
        const user = await User.findOne({ where: { username: username }});
        return (user === null) ? res.status(404).send(`Could not find the user with the given Username: ${username}`) : res.status(200).send(user);
    }
)

router.put(
    '/users/:username',
    check('firstname', "Firstname must be a string and not empty!").isString().not().isEmpty(),
    check('lastname', "Lastname must be a string and not empty!").isString().not().isEmpty(),
    check('username', "Username must be a string and not empty!").isString().not().isEmpty(),
    check('password', "Password must be a string and at least 12 characters long!").isLength({ min: 12, max: 64 }).isString(),

    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const { username } = req.params;
        const userData = req.body;
        const result = await User.update(userData, { where: { username: username }})
        return (result[0] === 0) ? res.status(404).send(`Could not find the user with the given Username: ${username}`) : res.status(201).send();
    }
)

router.delete(
    '/users/:username',

    async(req, res) => {
        const { username } = req.params;
        const result = await User.destroy({ where: { username: username }});
        return (result === 0) ? res.status(404).send(`Could not find the user with the given Username: ${username}`) : res.status(200).send();
    }
)

module.exports = router;