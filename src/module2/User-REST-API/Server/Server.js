require('better-logging')(console);
const express = require('express')
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const session = require("express-session");

const UserController = require("./Controllers/UserController");
const HomeController = require("./Controllers/HomeController");

const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-g4-zglbv.eu.auth0.com/.well-known/jwks.json'
  }),
  audience: 'https//users',
  issuer: 'https://dev-g4-zglbv.eu.auth0.com/',
  algorithms: ['RS256']
});

const sessionSettings = {
    secret: "best cohort ever",
    resave: false,
    saveUninitialized: true
}

class Server {
    constructor(controllers){
        this.app = express()
        this.setupOptions();
        this.initialiseControllers(controllers)
    }

    setupOptions(){
        //this.app.use(jwtCheck);
        this.app.use(session(sessionSettings))
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }

    initialiseControllers(controllers){
        controllers.forEach(controller => {
            this.app.use('/', controller.router)
        });
    }
}

server = new Server([
    new HomeController(),
    new UserController(),
])

module.exports = server.app;