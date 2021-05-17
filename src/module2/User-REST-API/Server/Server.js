require('better-logging')(console);
const express = require('express')
const UserController = require("./Controllers/UserController");

class Server {
    constructor(controllers){
        this.app = express()
        this.setupOptions();
        this.initialiseControllers(controllers)
    }

    setupOptions(){
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
    new UserController()
])

module.exports = server.app;