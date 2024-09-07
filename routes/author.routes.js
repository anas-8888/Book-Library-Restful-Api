const express = require('express');
const router = express.Router();
const authorController = require('../controllers/author.controller');

router.post('/', authorController.addAuthor);
router.get('/', authorController.getAllAuthors);
router.get('/:ID', authorController.getAuthorByID);
router.put('/:ID', authorController.updateAuthor);
router.delete('/:ID', authorController.deleteAuthor);

module.exports = router;