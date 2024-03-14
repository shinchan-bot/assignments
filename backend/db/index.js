const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://cneha321:Samsung%40123@cluster0.uon2zmn.mongodb.net/paytm");

const UserSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minLength:3,
        maxLength:30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
})

const User = mongoose.model("User", UserSchema);


const AccountSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:User,
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
})

const Account = mongoose.model("Account", AccountSchema);

module.exports = {
    User,
    Account
}