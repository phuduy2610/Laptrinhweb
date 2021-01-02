const GameModel = require('../models/gameModel');

exports.index = async (req, res, next) => {
    const limit = 8 ;
    const current_page = parseInt(req.query.page) || 1;
    const games = await GameModel.getbypage(current_page,limit);
    const GameCount = await GameModel.getGameCount();
    const stCount = await GameModel.getGameCountByGenre("Strategy");
    const fiCount = await GameModel.getGameCountByGenre("Fighting");
    const rpgCount = await GameModel.getGameCountByGenre("RPG");
    const shCount = await GameModel.getGameCountByGenre("Shooter");
    //Page
    const pagination = {
        page : current_page ,
        pageCount : Math.ceil(parseInt(GameCount) / limit),
    }
    const Count = {
        strategy : stCount, 
        fighting : fiCount,  
        rpg : rpgCount, 
        shooter : shCount
    }
    res.render('shop/shop', {games, pagination, Count });
};

exports.details = async (req, res, next) => {
   const game = await GameModel.getonebyid(req.params.id);
   res.render('shop/single', {game});
};