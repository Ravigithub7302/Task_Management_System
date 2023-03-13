const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require('dotenv').config()
const userSchema = new mongoose.Schema({
    fName:{
        type:String,
        require:true
    },
    lName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    userType:{
        type:String,
        require:true
    }

})
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: '1d',
    });
  };
module.exports = mongoose.model("User",userSchema);