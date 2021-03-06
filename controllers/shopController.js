const GameModel = require('../models/GameModel');
const CartModel = require('../models/CartModel');
let Cart = require('../models/localCartModel');
const GenreModel = require('../models/GenreModel');
const { ObjectId } = require('mongodb');
const e = require('express');

exports.index = async (req, res, next) => {
    const message = req.flash('message');
    console.log('message', message);
    const limit = 8;
    let games;
    let GameCount;
    let pagination = {};
    let queryString;
    let query = JSON.parse(JSON.stringify(req.query));
    // rerender selection in view
    if (query.genre != null) {
        if (!Array.isArray(query.genre)) {
            query.genre = [query.genre];
        }
        query.genre = query.genre.reduce(function (o, val) { o[val] = "true"; return o; }, {});
    }
    if (query.spec != null) {
        if (!Array.isArray(query.spec)) {
            query.spec = [query.spec];
        }
        query.spec = query.spec.reduce(function (o, val) { o[val] = "true"; return o; }, {});
    }
    // get page number 
    const current_page = parseInt(req.query.page) || 1;
    // check if have  filter or not 
    if (Object.keys(req.query).length === 0 || (Object.keys(req.query).length === 1 && req.query.page != null)) {
        games = await GameModel.getbypage(current_page, limit);
        GameCount = await GameModel.getGameCount();
    } else {
        let temp = JSON.parse(JSON.stringify(req.query));
        //get querystring before page
        queryString = req.originalUrl;
        if (req.query.page != null) {
            queryString = req.originalUrl.substring(0, req.originalUrl.length - 1);
        }
        queryString = queryString.replace(/&page=/g, "");
        queryString = queryString.substring(0, queryString.length);
        //get games and game count
        games = await GameModel.getByFilter(req.query, current_page, limit);
        GameCount = await GameModel.getGameCountByFilter(temp);
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
    res.render('shop/shop', { games, pagination, Count, query, message });
};

exports.details = async (req, res, next) => {
    const game = await GameModel.getonebyid(req.params.id);
    const games = await GameModel.getbylimitsamegenre(6, game.category, game.title);
    await GameModel.increaseViewById(req.params.id);
    if (game.multi == true) {
        game.mode = 'Multiplayer';
        if (game.single == true ) {
            game.mode += '/Single player';
        }
    }
    else if (game.single == true) {
        game.mode = 'Single player';
        if (game.multi == true ) {
            game.mode += '/Multiplayer';
        }
    }
    switch (game.req) {
        case 1:
            game.system = 'Low';
            break;
        case 2:
            game.system = 'Medium';
            break;
        case 3:
            game.system = 'High';
            break;
        case 4:
            game.system = 'Ultra';
            break;
    }
    const genre = await GenreModel.findgenrebyId(game.category);
    game.genre = genre.name;
    res.render('shop/single', { game, games });
};


exports.addtocartmany = async (req, res, next) => {
    console.log('id:', req.params.id);
    console.log('quantity', req.body.quantity);
    let cart = new Cart(req.session.cart ? req.session.cart : {});
    const product = await GameModel.getonebyid(req.params.id);
    cart.add(product, product._id, parseInt(req.body.quantity));
    req.session.cart = cart;
    await new Promise(resolve => setTimeout(resolve, 1000));
    res.redirect('back');
}