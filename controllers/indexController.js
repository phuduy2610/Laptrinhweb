const indexModel = require('../models/indexModel');

exports.index = (req, res, next) => {
    // Get from model
    const slider = indexModel.slider();
    const genres = indexModel.genres();
    // Pass data to view to display
    res.render('index',{slider,genres});
};