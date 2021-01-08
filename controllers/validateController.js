const userModel = require('../models/userModel');

exports.index = async(req,res,next) => {
    // Get from model
    result = parseInt(await userModel.validateUserAccount(req.query.code));
    // Pass data to view to display
    req.logout();
    if(result>0){
        res.render("validate/validated", {layout: false});
    } else {
        res.render("validate/failed", {layout: false});
    }
}