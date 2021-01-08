const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

/* GET home page. */
router.get('/', cartController.index);
router.get('/remove-from-cart/:id', cartController.removeproduct);
router.get('/checkout', checkAcessible, cartController.checkout);
router.post('/checkout', checkAcessible, cartController.complete);

function checkAcessible(req, res, next) {
    if (req.user) {
        next();
    } else {
        req.session.redirect = "/cart/checkout";
        res.redirect('/login');
    }
}

module.exports = router;
