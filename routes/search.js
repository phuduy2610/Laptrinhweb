const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

/* GET home page. */
router.get('/', searchController.index);
router.get('/strategy',searchController.categories);
router.get('/rpg',searchController.categories);
router.get('/fighting',searchController.categories);
router.get('/shooter',searchController.categories);
module.exports = router;
