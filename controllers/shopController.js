const shopModel = require('../models/shopModel');

exports.index = (req, res, next) => {
    // Get from model
    const games = shopModel.list();
    // Pass data to view to display
    res.render('shop',{games});
};