require('better-logging')(console);
const express = require('express')
const cors = require('cors'); 

const UserController = require("./Controllers/UserController");

class Server {
    constructor(){
        this.controllers = [
            new UserController()
        ]
        this.app = express()
        this.setupOptions();
        this.initialiseControllers()
    }

    setupOptions(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }

    initialiseControllers(){
        this.controllers.forEach(controller => {
            this.app.use('/', controller.router)
        });
    }
}

server = new Server();

module.exports = server.app