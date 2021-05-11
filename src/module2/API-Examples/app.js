const express = require('express');
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars')
const handlebars = expressHandlebars()

const { fetchJokes, fetchFDAS, fetchMemes } = require("./helper")

const port = 3000;
const app = express();

app.engine('handlebars', handlebars)
app.set('view engine', 'handlebars')

app.use(express.static('public/'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.use("/jokes", async (req, res) => { 
    const jokes = await fetchJokes();
    res.render("jokes", { jokes });
})

app.use("/fda", async(req, res) => {
    let fdas = await fetchFDAS();
    fdas = fdas['results'];
    res.render("fdas", { fdas })
})

app.use("/memes", async(req, res) => {
    let memes = await fetchMemes();
    memes = memes['data']['memes'];
    console.log(memes)
    res.render("memes", { memes })
})

app.use("/", (req, res) => { res.render("home"); })

app.listen(port, () => { console.log(`Server listening at http://localhost:${port}`) })