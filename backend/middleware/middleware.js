const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({path:__dirname+'/../../.env'});

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
    console.log("Auth middleware")
    let authHeader = req.headers.authorization;
    console.log(authHeader);
    if(!authHeader || !authHeader.startsWith("Bearer")){
        return res.status(403).json({
            msg:"No headers"
        });
    }
    authHeader = authHeader.split(" ");
    const token =  authHeader[1];

    try{
        const decode = jwt.verify(token, JWT_SECRET);
        const id = decode.id;
        req.id = id;
        next();
    }catch(err){
        return res.status(403).json({
            msg:"invalid token"
        });
    }
}

module.exports ={
    authMiddleware
}