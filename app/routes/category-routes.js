// Module Import
var express = require('express');
var router = express.Router();
const categoryController = require('../controllers/category-controller');
const auth = require('../middleware/auth');
const trimRequest = require('trim-request')

router.post('/add' , trimRequest.all , auth , categoryController.categoryAdd);
router.post('/list' , trimRequest.all ,auth ,  categoryController.listCategory);
router.post('/update' , trimRequest.all ,auth ,  categoryController.categorEdit);

module.exports = router;