const z = require("zod");
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv")
const {User} = require("../db/index")

dotenv.config({path:__dirname+'/../../.env'});

const JWT_SECRET = process.env.JWT_SECRET;


const userValidate = (req, res, next) => {
    const schema = z.object({
        email : z.string().email(),
        password : z.string().min(8),
        firstName : z.string(),
        lastName : z.string()
    })

    try{
        const result = schema.safeParse(req.body);
        console.log(result)
        if(result.success){
            next();
        }else{
            res.json({msg: "invalid user input"});
        }
    }catch(err){
        res.json({msg: "invalid input"});
    }
}

const userAuth = async (req, res, next) => {
    
        let email = req.body.email;
        let password = req.body.password;

        let result = await User.findOne({
            email,password
        })
        if(result){
            req.body.id = result.id.toString();
            next();
        }else{
            res.status(411).json({
                msg:"User does not exist"
            })
        }
    
}


module.exports = {
    userValidate,
    userAuth
}