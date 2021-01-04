const express = require('express');
const router = express.Router();
const forgotController = require('../controllers/forgotController');

/* GET home page. */
router.get('/',forgotController.index);
router.post('/',forgotController.forgot)
router.get('/:id',forgotController.form);
router.post('/:id',forgotController.reset)

module.exports = router;
