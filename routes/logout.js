const express = require('express');
const router = express.Router();
const logoutController = require('../controllers/logoutController');

/* GET home page. */
router.get('/',logoutController.index);

module.exports = router;
