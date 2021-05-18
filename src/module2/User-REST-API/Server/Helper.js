const express = require('express')
const cors = require('cors'); 

class Server {
    constructor(controllers){
        this.app = express()
        this.setupOptions();
        this.initialiseControllers(controllers)
    }

    setupOptions(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }

    initialiseControllers(controllers){
        controllers.forEach(controller => {
            this.app.use('/', controller.router)
        });
    }
}

module.exports = { Server }