const mongoose = require ("mongoose");

const userSchema = new mongoose.Schema({
    name: {type: String, reqired: true},
    email: {type: String, required: true},
    password: {type: String, reqired: true},
    role: {type: String, default: "USER"},
},{timestamps : true})

const UserModel= mongoose.model("User", userSchema);
module.exports = UserModel;