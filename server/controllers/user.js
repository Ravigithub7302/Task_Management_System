const User = require("../model/userModel.js");
const bcryptjs = require('bcrypt');
require('dotenv').config()
const jwt = require("jsonwebtoken");

module.exports.changePassword = async (req,res,next) =>{
    const {password ,confirmPassword} = req.body;
    if(password && confirmPassword){
        if(password !== confirmPassword){
            res.status(400).send({"message":"Password doesn't match"});
        }
        else{
            const salt = await bcryptjs.genSalt(10);
            const hashPassword = await bcryptjs.hash(password,salt);
        }
    }else{
        res.status(400).send({"message":"All fields are required"});
    }
}

module.exports.getUserInfo = async(req,res)=>{
    try{
        const data = await User.find({userType:"User"})
        return res.status(201).json(data);
    }
    catch(err){ 
        return res.status(404).send(err);
    }
}
module.exports.updateUser = async(req,res,next)=>{
try {
    console.log(req.body.userInfo.email)
    const updatedUser = await User.findByIdAndUpdate(
        req.body.userInfo.email,
      {
        fName: req.body.fName,
        lName: req.body.lName,
        email: req.body.email,
      },
      {
        new: true,
      },
    ).select('fName lName email');
    return res.status(200).json(updatedUser);
  } catch (err) {
    return next(err);
  }
};

