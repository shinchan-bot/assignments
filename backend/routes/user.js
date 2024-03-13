const { Router } = require("express");
const { User } = require('../db/index');
const { userValidate, userAuth } = require('../middleware/user');
const jwt = require('jsonwebtoken')
const dotenv = require("dotenv")
const cors = require('cors');

dotenv.config({path:__dirname+'/../../.env'});
const JWT_SECRET = process.env.JWT_SECRET;

const router = Router();

router.post('/signin', userValidate, userAuth, (req, res) => {
    let email = req.body.email;
    let id = req.body.id;
    const token = jwt.sign({id}, JWT_SECRET);
    res.status(200).json({
        token,
        msg:"SignIn successful"
    });  
})

router.post('/signup', userValidate, async (req, res) => {
    const {email, password, firstName, lastName} = req.body;
    const findUser = await User.findOne({email});
    if(!findUser){
        let result = User.create({email, password, firstName, lastName});
        console.log(result, "ravinder")
        const user = await User.findOne({email});
        let id = user._id;
        console.log("====>" ,id.toString())
        const token = jwt.sign({id}, JWT_SECRET);
        res.status(200).json({
            token,
            msg:"User created successfully."
        })
    }else{
        res.status(411).json({
            msg:"User alredy exist"
        })
    }
    
})

module.exports = router;