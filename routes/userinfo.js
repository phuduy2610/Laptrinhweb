const express = require('express');
const router = express.Router();
const userinfoController = require('../controllers/userinfoController');

/* GET home page. */
router.get('/', userinfoController.index);
router.post('/',userinfoController.edit);
module.exports = router;
