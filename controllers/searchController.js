const GameModel = require('../models/GameModel');

exports.index = async (req, res, next) => {
    const limit = 8;
    let games;
    let GameCount;
    let pagination = {};
    let queryString;
    let query = JSON.parse(JSON.stringify(req.query));
    // rerender selection in view
    if(query.genre !=null ) {
        if(!Array.isArray(query.genre)) {
            query.genre = [query.genre];
        }
        query.genre = query.genre.reduce(function(o,val) { o[val] = "true"; return o;}, {});
    } 
    if(query.spec !=null) {
        if(!Array.isArray(query.spec)) {
            query.spec = [query.spec];
        }
        query.spec = query.spec.reduce(function(o,val) { o[val] = "true"; return o;}, {});
    } 
    // get page number 
    const current_page = parseInt(req.query.page) || 1;
    // check if have  filter or not 
    if(Object.keys(req.query).length === 1 || (Object.keys(req.query).length === 2 && req.query.page != null)){
        games = await GameModel.getbypagesamename(current_page,limit,req.query.keyword);
        GameCount = await GameModel.getGameCountGetsamename(req.query.keyword);
    } else {
        let temp = JSON.parse(JSON.stringify(req.query));
        //get querystring before page
        queryString = req.originalUrl;
        if(req.query.page != null) {
            queryString = req.originalUrl.substring(0,req.originalUrl.length-1);
        }
        queryString = queryString.replace(/&page=/g,"");
        queryString = queryString.substring(0,queryString.length);
        //get games and game count
        games = await GameModel.getByFilterWithKeyword(req.query,current_page, limit);
        GameCount = await GameModel.getGameCountByFilterWithKeyword(temp);
        //get query string before page
        pagination.parentSub = queryString;
    }
    
    const stCount = await GameModel.getGameCountByGenre("Strategy");
    const fiCount = await GameModel.getGameCountByGenre("Fighting");
    const rpgCount = await GameModel.getGameCountByGenre("RPG");
    const shCount = await GameModel.getGameCountByGenre("Shooter");
    //Page
    pagination.page = current_page;
    pagination.pageCount = Math.ceil(parseInt(GameCount) / limit);
    
    const Count = {
        strategy: stCount,
        fighting: fiCount,
        rpg: rpgCount,
        shooter: shCount
    }
    res.render('shop/shop', { games, pagination, Count, query });
};