require('dotenv').config('.env');
const express = require('express')
const fetch = require("node-fetch");
const request = require("request");

const { CLIENT_ID, CLIENT_SECRET, AUTH0_DOMAIN, AUTH0_AUDIENCE } = process.env

class HomeController {
    router = express.Router();
    constructor() {
        this.router.get('/login', this.login)
    }

    login(req, res) {
        const auth0Config = {
            client_id: `${CLIENT_ID}`,
            client_secret: `${CLIENT_SECRET}`,
            audience: AUTH0_AUDIENCE,
            grant_type: 'client_credentials'
        }

        fetch(`${AUTH0_DOMAIN}/oauth/token`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(auth0Config)
        })
        .then(res => res.json())
        .then(body => res.status(200).send(body.access_token))
        .catch(error => {
            console.error(`Error: ${error.message}.`) 
            res.status(400).send()
        })
    }

}

module.exports = HomeController;