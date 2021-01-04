const express = require('express');
const router = express.Router();
const userApiController = require('../../controllers/api/userController');

/* GET home page. */ 
router.get('/is-exist',userApiController.isExist);
module.exports = router;
