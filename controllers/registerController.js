const userModel = require('../models/userModel');
const passport = require("../passport");

exports.index = async(req,res,next) => {
    res.render("register/register");
}

exports.addUser = async(req,res,next) => {
    user = {
        email : req.body.email,
        username : req.body.username,
        password : req.body.password,
        status: false
    }
    user = await userModel.addNewUser(user);
    if(user){
        res.send({respond: 1});
    }
    else
    {
        res.send({respond: 0});
    }
}