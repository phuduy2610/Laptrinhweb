const userModel = require('../../models/userModel');

exports.isExist = async (req,res,next) => {
    res.json(await userModel.isEmailExist(req.body.email));
}