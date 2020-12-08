const GameModel = require('../models/GameModel');

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
    //currentPage = req.originalUrl.charAt(req.originalUrl.length - 1 )
    const limit = 8 ;
    const current_page = parseInt(currentPage) || 1;
    const games = await GameModel.getbypagesamename(current_page,limit,req.query.keyword);
    const GameCount = games.length;
    //console.log("THISSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS");
    //queryString = req.originalUrl;
    console.log(queryString);

    //Page
    const pagination = {
        page : current_page ,
        pageCount : Math.ceil(parseInt(GameCount) / limit),
        parentSub: queryString
    }
    res.render('shop/shop', {games,pagination});
};
