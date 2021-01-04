const nodemailer = require('nodemailer');
const userModel = require('../models/userModel');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require("bcrypt");

exports.index = async (req,res,next) => {
    res.render("forgot/forgot");
}

exports.forgot = async (req,res,next) => {
    user = await userModel.getUserByEmail(req.body.email);
    if(user) {
        // generate validate code
        forgotCode = uuidv4();
        userModel.addForgotToken(forgotCode, user._id);


        // link: to change
        url = "http://" + req.get('host') + "/forgot/" + forgotCode;

        // send email
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        let mailOptions = {
            from: "danddgamestore@gmail.com",
            to: req.body.email,
            subject: "[dandd] forgot link",
            html: "Please click this link to reset your email: <a href=\"" + url + "\">" + url + "</a>"
        };

        transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
                console.log("Error Occurs");
            } else {
                console.log("Email sent");
            }
        });

        // send respond

        res.send({ respond: 1 });

    } else {
        res.send({respond: 0});
    }
}

exports.form = async(req,res,next) => {
    res.render("forgot/form", {layout:false});
}

exports.reset = async(req,res,next) => {
    forgotCode = req.originalUrl.replace("/forgot/","");
    userId = await userModel.getUserIdFromForgot(forgotCode);
    if(userId) {
        await userModel.updateUserPassword(userId,req.body.password);
        await userModel.removeForgotToken(forgotCode);
        res.send({respond: 1});
    } else {
        res.send({respond: 0});
    }
}