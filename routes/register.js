const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');

/* GET home page. */
router.get('/', indexController.index);

module.exports = router;
