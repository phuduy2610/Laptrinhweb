const GameModel = require('../models/gameModel');
const CartModel = require('../models/CartModel');
let Cart = require('../models/localCartModel');
const { ObjectId } = require('mongodb');

exports.index = async (req, res, next) => {
    const message = req.flash('message');
    console.log('message',message);
    const limit = 8;
    let games;
    const current_page = parseInt(req.query.page) || 1;
    if(typeof req.query.params == "undefined") {
        games = await GameModel.getbypage(current_page, limit);
    }
    const GameCount = await GameModel.getGameCount();
    const stCount = await GameModel.getGameCountByGenre("Strategy");
    const fiCount = await GameModel.getGameCountByGenre("Fighting");
    const rpgCount = await GameModel.getGameCountByGenre("RPG");
    const shCount = await GameModel.getGameCountByGenre("Shooter");
    //Page
    const pagination = {
        page: current_page,
        pageCount: Math.ceil(parseInt(GameCount) / limit),
    }
    const Count = {
        strategy: stCount,
        fighting: fiCount,
        rpg: rpgCount,
        shooter: shCount
    }
    res.render('shop/shop', { games, pagination, Count,message });
};

exports.details = async (req, res, next) => {
    const game = await GameModel.getonebyid(req.params.id);
    const games = await GameModel.getbylimitsamegenre(4, game.category, game.title);
    res.render('shop/single', { game, games });
};

// exports.addtocart = async (req, res, next) => {
//     let cart = new Cart(req.session.cart ? req.session.cart : {});
//     const product = await GameModel.getonebyid(req.params.id);
//     cart.add(product,product.id,1);
//     req.session.cart = cart;
//     console.log('cart:',req.session.cart);
//     res.redirect('/shop');
// }

exports.addtocartmany = async(req,res,next)=>{
    console.log('id:',req.params.id);
    console.log('quantity',req.body.quantity);
    let cart = new Cart(req.session.cart ? req.session.cart : {});
    const product = await GameModel.getonebyid(req.params.id);
    cart.add(product,product.id,parseInt(req.body.quantity));
    req.session.cart = cart;
    await new Promise(resolve => setTimeout(resolve, 1000));
    res.redirect('back');
}