const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');

router.post('/', categoryController.addCategory);
router.get('/', categoryController.getAllCategories);
router.get('/:ID', categoryController.getCategoryByID);
router.put('/:ID', categoryController.updateCategory);
router.delete('/:ID', categoryController.deleteCategory);

module.exports = router;