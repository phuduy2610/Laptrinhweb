const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const userController = require('../controllers/userController');

/* GET home page. */
router.get('/', indexController.index);
router.get('/login',userController.login);
router.get('/register',userController.register);



module.exports = router;
