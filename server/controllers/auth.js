const User = require("../model/userModel.js");
const bcryptjs = require("bcrypt");
require('dotenv').config()
const sendToken = require("../utils/JwtToken.js");

// Login...
module.exports.login = async (req, res, next) => {
    if(!req.body.email || !req.body.password){
        return next(res.status(404).send({message:"Email and password are required"})
        );
    }
    try {
            const user = await User.findOne({ email: req.body.email}).select('fName lName email userType password');
            if(!user){
                return next(res.status(404).send({message:"User not found"}));
            }
            const isPasswordCorrect = bcryptjs.compare(
                req.body.password,
                user.password
            );
            if(!isPasswordCorrect){
                return next(res.status(404).send({message:"Password is incorrect"}));
            }
             sendToken(user, 200, res)           
    }catch(err){
        return next(res.status(400));
    }
}


// Signup....
module.exports.signup = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (user) {
            return next(res.status(400).send({ message: "User already exist" }));
        }
        const salt = await bcryptjs.genSalt(10);

        const hashedPassword = await bcryptjs.hash(req.body.password, salt);
        const newUser = new User({
            fName: req.body.fName,
            lName: req.body.lName,
            email: req.body.email,
            userType:req.body.userType,
            password: await bcryptjs.hash(req.body.password, hashedPassword)
        });
        await newUser.save();
        const savedUser = await User.findOne({ email: req.body.email });
        return next(res.status(201).send({ message: "Registration success"}));
    }
    catch (err) {
        // console.log("err");
        return res.status(404).json(err);
    }
}

//logout....
// module.exports.logout = async (req, res, next) => {
//     res.cookie("token", null, {
//       expires: new Date(Date.now()),
//       httpOnly: true,
//     });
  
//     res.status(200).json({
//       success: true,
//       message: "Logged Out",
//     });
//   };