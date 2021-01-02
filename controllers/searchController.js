const GameModel = require('../models/gameModel');

exports.index = async (req, res, next) => {
    
    let queryString = req.originalUrl;
    let currentPage;
    if(req.query.keyword!=null && req.originalUrl.includes("&page="))
    {
        currentPage = req.originalUrl.charAt(req.originalUrl.length - 1 )
        queryString = req.originalUrl.replace(/&page=/g,"")
        queryString = queryString.substring(0,queryString.length-1);
    }
    else
    {
        currentPage = 1;
    }
    const limit = 8 ;
    const current_page = parseInt(currentPage) || 1;
    const games = await GameModel.getbypagesamename(current_page,limit,req.query.keyword);
    const GameCount = await GameModel.getGameCountGetsamename(req.query.keyword);
    const stCount = await GameModel.getGameCountByGenre("Strategy");
    const fiCount = await GameModel.getGameCountByGenre("Fighting");
    const rpgCount = await GameModel.getGameCountByGenre("RPG");
    const shCount = await GameModel.getGameCountByGenre("Shooter");

    console.log(GameCount);
    //Page
    const pagination = {
        page : current_page ,
        pageCount : Math.ceil(parseInt(GameCount) / limit),
        parentSub: queryString
    }
    const Count = {
        strategy : stCount, 
        fighting : fiCount,  
        rpg : rpgCount, 
        shooter : shCount
    }
    res.render('shop/shop', {games, pagination, Count });
};

exports.categories = async (req, res, next) => {
    genre = req.route.path.substring(1,req.route.path.length);
    const limit = 4 ;
    const current_page = parseInt(req.query.page) || 1;
    const games = await GameModel.getbypagesamegenre(current_page,limit,genre);
    const GameCount = await GameModel.getGameCountByGenre(genre);
    const stCount = await GameModel.getGameCountByGenre("Strategy");
    const fiCount = await GameModel.getGameCountByGenre("Fighting");
    const rpgCount = await GameModel.getGameCountByGenre("RPG");
    const shCount = await GameModel.getGameCountByGenre("Shooter");
    const pagination = {
        page : current_page ,
        pageCount : Math.ceil(parseInt(GameCount) / limit)
    }
    const Count = {
        strategy : stCount, 
        fighting : fiCount,  
        rpg : rpgCount, 
        shooter : shCount
    }
    res.render('shop/shop', {games, pagination, Count });
 };
