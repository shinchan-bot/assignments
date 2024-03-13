const { Router } = require("express");
const { User } = require('../db/index');
const { userValidate, userAuth } = require('../middleware/user');
const jwt = require('jsonwebtoken')
const dotenv = require("dotenv")
dotenv.config({path:__dirname+'/../../.env'});
const JWT_SECRET = process.env.JWT_SECRET;


const router = Router();

router.post('/signin', (req, res) => {
    console.log("signin endpoint");
})

router.post('/signup', userValidate, (req, res) => {
    console.log(__dirname+"/../../.env")
    console.log("sign up endpoint");
    const {email, password, firstName, lastName} = req.body;
    User.create({email, password, firstName, lastName});
    console.log(JWT_SECRET)
    const token = jwt.sign({email, firstName, lastName}, JWT_SECRET);
    res.json({
        token,
        msg:"User created successfully."
    })
})

module.exports = router;