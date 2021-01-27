const database = require('./server/private/database')

const bcrypt = require('bcrypt')
const express = require('express');
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');

const app = express();
const port = 3000;

const users = []

app.get('/users', (req, res) => {
    res.json(users)
})

app.post('/users', async (req, res) => {
    console.log(req.body)
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = { name: req.body.name, password: hashedPassword }
        users.push(user)
        console.log(req.body.name)
        console.log(hashedPassword)
        res.status(201).send() 

    } catch{
        res.status(500).send()
    }
})

app.post('/users/login', async(req, res) => {
    const user = users.find(user => user.name = req.body.name)
    if( user == undefined) {
        return res.status(400).send("Cannot find user.")
    }

    try{
        if(await bcrypt.compare(req.body.password, user.password)) {
            res.send("Success")
        } else {
            res.send("Denied.")
        }
        

    } catch {
        res.status(500).send()
    }
})

const handlebars = expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})

app.engine('handlebars', handlebars)
app.set('view engine', 'handlebars')

app.use(express.static('public/'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(require('./server/routes/router'))

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})