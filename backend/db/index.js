const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://cneha321:Samsung%40123@cluster0.uon2zmn.mongodb.net/paytm");

const UserSchema = mongoose.Schema({
    email:String,
    password:String,
    firstName:String,
    lastName: String
})

const User = mongoose.model("User", UserSchema);

module.exports = {
    User
}