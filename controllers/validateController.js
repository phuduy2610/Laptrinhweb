const userModel = require('../models/userModel');

exports.index = async(req,res,next) => {
    // Get from model
    validateCode = req.originalUrl.replace("/validate/","");
    userModel.validateUserAccount(validateCode);
    // Pass data to view to display
    req.logout();
    res.redirect('/login');
}