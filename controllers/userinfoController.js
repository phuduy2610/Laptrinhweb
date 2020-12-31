const UserInfoModel = require('../models/UserInfoModel');

exports.index = async(req, res, next) => {
    // Get from model
    const user = await UserInfoModel.getonebyid("1");
    // Pass data to view to display
    res.render('userinfo/userinfo',{user});
};

exports.edit = async(req, res, next) => {
    // Get from model
    await UserInfoModel.updateuserById("1",{ name: req.body.name, birthday: req.body.birthday,phone: req.body.phone});
    const user = await UserInfoModel.getonebyname(req.body.name);

    // Pass data to view to display
    res.render('userinfo/userinfo',{user});
};