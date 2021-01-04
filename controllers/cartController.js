const CartModel = require('../models/CartModel');
const GameModel = require('../models/GameModel');
const {ObjectId} = require('mongodb');

exports.index = async (req, res, next) => {
    const products = await CartModel.listofproductsameuser("2");
    let games_list=[];
    for(i=0;i<products.length;i++){
        const game = await GameModel.getonebyid(products[i].gameId);
        const price =parseInt(products[i].qty)*parseInt(game.basePrice.replace(/[^\d.-]/g, ''));
        game.qty = products[i].qty;
        game.basePrice = price;
        games_list.push(game);
    }
    let sum_price = 0;
    for(i=0;i<games_list.length;i++){
        sum_price += games_list[i].basePrice;
    }

res.render("cart/cart",{games_list,sum_price});
}

exports.removeproduct = async(req,res,next)=>{
    await CartModel.removeproduct("2",req.params.id);
    res.redirect('/cart');
}

