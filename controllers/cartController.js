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
    if(!req.session.cart){
        return res.render("cart/cart",{products:null});
    }
    res.render('cart/payment',{products: cart.generateArray(),totalPrice:cart.totalPrice,totalQty:cart.totalQty});
}

exports.complete = async(req,res,next)=>{    
    console.log('local:',req.session.cart);
    let cart = new Cart(req.session.cart);
    cart.delivery_method=req.body.optradio;
    cart.firstname = req.body.firstName;
    cart.lastname = req.body.lastName;
    cart.address = req.body.address;
    cart.userId = res.locals.user._id;
    CartModel.addnewcart(cart);
    req.session.cart = null;
    req.flash('message','You have checked out successfully !');
    res.redirect('/shop');
}