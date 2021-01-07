const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController');

/* GET home page. */
router.get('/', shopController.index);
router.get('/:id',shopController.details);
router.post('/:id',shopController.addtocartmany);
module.exports = router;
