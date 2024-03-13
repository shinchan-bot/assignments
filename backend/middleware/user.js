const z = require("zod");
const jwt = require('jsonwebtoken');
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


module.exports = {
    userValidate
}