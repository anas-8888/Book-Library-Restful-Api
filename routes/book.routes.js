const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controller');

router.post('/', bookController.addBook);
router.get('/', bookController.getAllBooks);
router.get('/:ID', bookController.getBookByID);
router.put('/:ID', bookController.updateBook);
router.delete('/:ID', bookController.deleteBook);

module.exports = router;