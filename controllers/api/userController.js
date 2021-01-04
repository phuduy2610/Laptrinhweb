const userModel = require('../../models/userModel');

exports.isExist = async (req,res,next) => {
    isExist = await userModel.isEmailExist(req.query.email);
    if(isExist) {
        res.json(true);
    }
    else {
        res.json(false)
    }
}