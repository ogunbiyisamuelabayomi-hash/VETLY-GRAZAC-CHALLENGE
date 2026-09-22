const UserModel = require("../models/userModel");
const bcrypt = require ("bcrypt");
const generateToken = require("../utils/generateToken")


const registerUser = async (req, res ) => {

const { name, email, password} = req.body;
try{
    
if (!name){
    return res.status(400).json({message: "name is required"});
}
 if (!email.includes("@")){
            return res.status(400).json({message: "please enter a valid email"});
        }
 if (!email) {
            return res.status(400).json({message:"email is required"});
        }
        if (!password) {
            return res.status(400).json({message: "password is required"});
        }

    const userExist = await UserModel.findOne({email});
if (userExist) {
    return res.status(409).json("user already exist");
}

const hashPassword = await bcrypt.hash(password, 10);
const newUser = await UserModel.create({
    name,
    email,
    password:hashPassword
});

return res.status(201).json({message: "User Registered Successfully",
    data:{
_id: newUser._id,
name: newUser.name,
email: newUser.email,
role: newUser.role
    }
});
} catch(error) {
 console.log(error.mesage)
    return res.status(500).json({mesage: "Registration failed"})
}

};


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;  
        if(!email){
            return res.status(400).json({message: "email is required"});
        }
        if(!password){
            return res.status(400).json({message: "password is required"});
        }

const user = await UserModel.findOne({ email });
if(!user){
    return res.status(404).json({message: "user not found"});
}

const comparePassword = await bcrypt.compare(password, user.password);
if(!comparePassword){
    return res.status(401).json({message: "invalid password"});
}

 const token = generateToken(user._id, user.role);

return res.status(200).json({
    message: "login successful",
    token: token,
        data:{
_id: user._id,
name: user.name,
email: user.email,
role: user.role
    }
});
    }catch(error){
        console.log(error.mesage)
    return res.status(500).json({mesage: "login failed"})
}
};


module.exports ={
    registerUser,
    loginUser

};