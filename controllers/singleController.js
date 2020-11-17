const singleModel = require('../models/singleModel');

exports.index = (req, res, next) => {
    // Get from model
    const first = singleModel.first();
    const middle = singleModel.middle();
    const samegenre = singleModel.samegenre();
    // Pass data to view to display
    res.render('single',{first,middle,samegenre});
};