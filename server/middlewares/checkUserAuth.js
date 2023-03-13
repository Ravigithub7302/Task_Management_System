const User = require("../model/userModel.js");
const express = require("express");
const jwt = require("jsonwebtoken");
require('dotenv').config()

module.exports.checkUserAuth = async(req,res,next)=>{
    let token;
    const {authorization} = req.headers; 
    if(authorization && authorization.startsWith('Bearer')){
        try{
            token = authorization.split(' ')[1];
            const userId = jwt.verify(token,process.env.JWT_SECRET_KEY);
            req.user = await User.findById(userId).select('-password');
         next();
        }catch(err){
            res.status(401).send({"message":"Unauthorized User"});
        }
    }
    if(!token){
        res.status(401).send({"message":"Unauthorized User"});
    }
}