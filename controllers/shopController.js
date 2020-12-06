const GameModel = require('../models/GameModel');

exports.index = async (req, res, next) => {
    const limit = 8 ;
    const current_page = parseInt(req.query.page) || 1;
    const games = await GameModel.getbypage(current_page,limit);
    const Highest_Id = await GameModel.getHighestId();
    //Page
    const pagination = {
        page : current_page ,
        pageCount : Math.ceil(parseInt(Highest_Id[0].id) / limit)
    }
    console.log(pagination);
    res.render('shop/shop', {games,pagination});
};

exports.details = async (req, res, next) => {
   //Get book from model
   const game = await GameModel.getonebyid(req.params.id);
   console.log('single games',game);
   res.render('shop/single', {game});
};