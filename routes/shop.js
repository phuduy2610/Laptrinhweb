const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController');

/* GET home page. */
router.get('/', shopController.index);
router.get('/:id',shopController.details);
router.get('/add-to-cart/:id',shopController.addtocart);
router.post('/:id',shopController.addtocartmany);
module.exports = router;
