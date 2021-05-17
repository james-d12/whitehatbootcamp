const { response } = require('express')
const express = require('express')
const User = require('../Models/User')

class Counter {
    static lookup = {}
    
    constructor(id) {
        this.value = 1
        Counter.lookup[id] = this 
    }

    inc() {
        this.value += 1
        return this.value.toString()
    }
}


class HomeController {
    router = express.Router();
    constructor(){
        this.router.use(this.middleware);
        this.router.get('/counter', this.counterGet);
    }

    middleware(req, res, next) {
        Counter.lookup[req.session.id] = Counter.lookup[req.session.id] || new Counter(req.session.id)
        next()
    }

    counterGet(req, res) {
        res.send(Counter.lookup[req.session.id].inc())
    }


    async login(req, res){
        const username = req.body.username;
        const password = req.body.password;

        if(username && password){
            const user = await User.findOne({where: { username: username }})
            const result = await User.compare(user.password, password)

            if(result === 1){
                response.session.loggedin = true;
            }
        }
    }

    async logout(req, res) {
        response.session.loggedin = false;
    }
}

module.exports = HomeController;