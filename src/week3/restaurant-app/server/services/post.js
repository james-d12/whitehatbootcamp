const bcrypt = require('bcrypt')
const { Restaurant, Menu, MenuItem } = require('../private/models');


exports.RestaurantAdd = async (req, res) => {
    const body = req.body;
    await Restaurant.create({name: body.name, image: body.url})
    res.redirect('/')
}

exports.UserCreate = async (req, res) => {
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
}

exports.UserLogin = async (req, res) => {
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
}