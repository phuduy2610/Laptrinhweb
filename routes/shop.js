const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController');

/* GET home page. */
router.get('/', shopController.index);
router.get('/:id',shopController.details);
module.exports = router;
