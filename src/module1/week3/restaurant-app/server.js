const fs = require('fs')
const https = require('https')
const key = fs.readFileSync('./certificates/key.pem') 
const cert = fs.readFileSync('./certificates/cert.pem')

const express = require('express');
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const cookieParser = require('cookie-parser')
const session = require('express-session');
const helmet = require('helmet')

const app = express();
const port = 443;
const server = https.createServer({key: key, cert: cert}, app)

const handlebars = expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})


app.engine('handlebars', handlebars)
app.set('view engine', 'handlebars')

app.use(express.static('public/'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(require('./server/routes/router'))

server.listen(port, () => {
    console.log(`Server listening at https://localhost:${port}`)
})
