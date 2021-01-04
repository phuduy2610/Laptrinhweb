const GameModel = require('../models/gameModel');
const CartModel = require('../models/CartModel');
const { ObjectId } = require('mongodb');

exports.index = async (req, res, next) => {
    const limit = 8;
    const current_page = parseInt(req.query.page) || 1;
    const games = await GameModel.getbypage(current_page, limit);
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
    res.render('shop/shop', { games, pagination, Count });
};

exports.details = async (req, res, next) => {
    const game = await GameModel.getonebyid(req.params.id);
    const games = await GameModel.getbylimitsamegenre(4, game.category, game.title);
    res.render('shop/single', { game, games });
};

exports.addtocart = async (req, res, next) => {
    const products = await CartModel.listofproductsameuser("2");
    let flag = 0;
    if (products.length > 0) {
        for (i = 0; i < products.length; i++) {
            if(products[i].gameId==req.params.id){
                await CartModel.updateproduct("2",req.params.id,{ qty: products[i].qty + 1, totalQty: 1 });
                flag = 1;
                break;
            }
        }
        if(flag != 1){
            await CartModel.addnewproduct({ userId: "2", gameId: req.params.id, qty: 1, totalQty: 1 });
        }
    }
    else {
        await CartModel.addnewproduct({ userId: "2", gameId: req.params.id, qty: 1, totalQty: 1 });
    }
    res.redirect('/shop');
}

exports.addtocartmany = async(req,res,next)=>{
    console.log('id:',req.params.id);
    console.log('quantity',req.body.quantity);
    const products = await CartModel.listofproductsameuser("2");
    let flag = 0;
    if (products.length > 0) {
        for (i = 0; i < products.length; i++) {
            if(products[i].gameId==req.params.id){
                await CartModel.updateproduct("2",req.params.id,{ qty: parseInt(products[i].qty) + parseInt(req.body.quantity), totalQty: 1 });
                flag = 1;
                break;
            }
        }
        if(flag != 1){
            await CartModel.addnewproduct({ userId: "2", gameId: req.params.id, qty: req.body.quantity, totalQty: 1 });
        }
    }
    else {
        await CartModel.addnewproduct({ userId: "2", gameId: req.params.id, qty: req.body.quantity, totalQty: 1 });
    }
    res.redirect('/shop');
}