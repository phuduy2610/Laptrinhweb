const express = require('express');
const router = express.Router();
const singleController = require('../controllers/singleController');

/* GET home page. */
router.get('/', singleController.index);

module.exports = router;
