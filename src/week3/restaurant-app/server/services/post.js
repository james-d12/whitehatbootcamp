const bcrypt = require('bcrypt')
const { check, validationResult } = require('express-validator');
const { Restaurant, Review, Menu, MenuItem } = require('../private/models');

exports.RestaurantAdd = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array})
    }
    
    const { name, image } = req.body 
    await Restaurant.create({name: name, image: image})
    res.redirect('/')
}

exports.RestaurantReviewAdd = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array})
    }

    const {name, rating, comment } = req.body
    await Review.create({
        name: name,
        rating: rating, 
        comment: comment, 
        restaurant_id: req.params.id
    })
    res.redirect('back')
}

exports.UserCreate = async (req, res) => {
    console.log("User create called.")
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