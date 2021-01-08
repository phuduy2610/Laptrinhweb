const express = require('express');
const router = express.Router();
const validateController = require('../controllers/validateController');

/* GET home page. */
router.get('/',validateController.index);
module.exports = router;
