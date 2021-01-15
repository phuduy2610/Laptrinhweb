const userModel = require('../models/userModel');
const passport = require("../passport");
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');

exports.index = async (req, res, next) => {
    res.render("register/register");
}

exports.addUser = async (req, res, next) => {
    user = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        cover: null,
        status: false,
        blocked: false
    }
    user = await userModel.addNewUser(user);
    if (user) {

        // generate validate code
        validateCode = uuidv4();
        userModel.addValidationToken(validateCode, user._id);


        // link: to change
        url = "http://" + req.get('host') + "/validate?code=" + validateCode;

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
            subject: "[dandd] Validate link",
            html: "Please click this link to validate your account: <a href=\"" + url + "\">" + url + "</a>"
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
    }
    else {
        res.send({ respond: 0 });
    }
}