const CartModel = require('../models/CartModel');
const GameModel = require('../models/GameModel');
const {ObjectId} = require('mongodb');
let Cart = require('../models/localCartModel');

exports.index = async (req, res, next) => {
    if(!req.session.cart){
        return res.render("cart/cart",{products:null});
    }
    let cart = new Cart(req.session.cart);
    res.render("cart/cart",{products: cart.generateArray(),totalPrice:cart.totalPrice,totalQty:cart.totalQty});

//     let games_list=[];
//     let sum_price = 0;
//     if(res.locals.user){
//     const products = await CartModel.listofproductsameuser(res.locals.user._id);
//     for(i=0;i<products.length;i++){
//         const game = await GameModel.getonebyid(products[i].gameId);
//         const price =parseInt(products[i].qty)*parseInt(game.basePrice.replace(/[^\d.-]/g, ''));
//         game.qty = products[i].qty;
//         game.basePrice = price;
//         games_list.push(game);
//     }
//     for(i=0;i<games_list.length;i++){
//         sum_price += games_list[i].basePrice;
//     }
// }

}

exports.removeproduct = async(req,res,next)=>{
    // await CartModel.removeproduct(res.locals.user._id,req.params.id);
    let cart = new Cart(req.session.cart);
    cart.deleteItem(req.params.id);
    req.session.cart = cart;
    res.redirect('/cart');
}

exports.checkout = async(req,res,next)=>{
    let cart = new Cart(req.session.cart);
    //TODO: add user id here
    //render view form 
    //CartModel.addnewcart(cart);
    if(!req.session.cart){
        return res.render("cart/cart",{products:null});
    }
    res.render('cart/payment',{products: cart.generateArray(),totalPrice:cart.totalPrice,totalQty:cart.totalQty});
}

exports.complete = async(req,res,next)=>{    
    console.log(req.body);
    let cart = new Cart(req.session.cart);
    cart.delivery_method=req.body.delivery_method;
    cart.firstname = req.body.firstname;
    cart.lastname = req.body.lastname;
    cart.address = req.body.address;
    cart.userId = res.locals.user._id;
    CartModel.addnewcart(cart);
}