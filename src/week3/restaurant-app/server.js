const database = require('./server/private/database')

const bcrypt = require('bcrypt')
const fs = require('fs')
const key = fs.readFileSync('./certificates/key.pem') 
const cert = fs.readFileSync('./certificates/cert.pem')
const https = require('https')

const express = require('express');
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');

const app = express();
const server = https.createServer({key: key, cert: cert}, app)

const port = 8000;

const handlebars = expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})

app.engine('handlebars', handlebars)
app.set('view engine', 'handlebars')

app.use(express.static('public/'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(require('./server/routes/router'))

server.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})

/*
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})
*/