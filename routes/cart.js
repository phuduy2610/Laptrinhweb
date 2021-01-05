const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

/* GET home page. */
router.get('/', cartController.index);
router.get('/remove-from-cart/:id', cartController.removeproduct);
router.get('/checkout', cartController.checkout);
module.exports = router;
