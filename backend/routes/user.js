const { Router } = require("express");
const { User, Account } = require('../db/index');
const { userValidate, userAuth } = require('../middleware/user');
const { authMiddleware } = require("../middleware/middleware");
const jwt = require('jsonwebtoken')
const dotenv = require("dotenv")
const cors = require('cors');

dotenv.config({path:__dirname+'/../../.env'});
const JWT_SECRET = process.env.JWT_SECRET;

const router = Router();

router.post('/signin', userValidate, userAuth, (req, res) => {
    let id = req.id;
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
        let result = await User.create({email, password, firstName, lastName});
        console.log(result, "ravinder")
        const user = await User.findOne({email});
        let id = user._id;
        let balance = Math.floor((Math.random()*10000) + 1);
        console.log("====>" ,id.toString())
        let resultCreateAccount = await Account.create({userId:id, balance});
        console.log(resultCreateAccount);
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

router.put("/update", authMiddleware, async (req, res) => {
    const userId = req.id;
    console.log("reached here")
    const user = await User.findOne({_id : userId});
    console.log("user obj --> ", user);
    let password = req.body.password ? req.body.password : user.password;
    let firstName = req.body.firstName ? req.body.firstName : user.firstName;
    let lastName = req.body.lastName ? req.body.lastName : user.lastName;

    try{
        await User.updateOne(
            {
                _id:userId
            },{
                $set:{
                    password,
                    firstName,
                    lastName
                }
            }
        )
        res.status(200).json({
            msg:"Updated successfully"
        });
    }catch(err){
        res.status(411).json({
            msg:"Error while updating information"
        })
    }
})

router.get("/bulk", authMiddleware, async(req, res) => {
    const name = req.query.filter;
    console.log(name)
    try{
        let users = await User.find({firstName:name}).lean();
        users = users.map(user => {
            delete user.password;
            delete user.email;
            console.log(user, "0000")
            return user
        })
        console.log(users)

        res.status(200).json(users);
    }catch(err){
        res.status(403).json({});
    }
})

module.exports = router;