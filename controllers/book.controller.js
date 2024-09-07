const { Book, Author, Category } = require('../models');

function validateFields(requiredFields, reqBody) {
      const missingFields = requiredFields.filter(field => !reqBody[field]);
      return missingFields.length === 0 ? null : `Missing required fields: ${missingFields.join(', ')}`;
}

exports.addBook = async (req, res) => {
      try {
            const validationError = validateFields(['title', 'authorID', 'categoryID', 'publishedDate'], req.body);
            if (validationError) {
                  return res.status(400).json({ error: validationError });
            }

            const book = await Book.create({
                  title: req.body.title,
                  authorID: req.body.authorID,
                  categoryID: req.body.categoryID,
                  publishedDate: req.body.publishedDate
            });
            
            res.status(201).json(book);
      } catch (err) {
            res.status(500).json({ error: err.message });
      }
};

exports.getAllBooks = async (req, res) => {
      try {
            const { authorID, categoryID } = req.query;
            const filters = {};

            if (authorID) filters.authorID = Number(authorID);
            if (categoryID) filters.categoryID = Number(categoryID);
            
            const books = await Book.findAll({
                  where: filters,
                  include: [
                        { model: Author, attributes: ['ID', 'name'] },
                        { model: Category, attributes: ['ID', 'name'] }
                  ]
            });

            res.status(200).json(books);
      } catch (err) {
            res.status(500).json({ error: err.message });
      }
};

exports.getBookByID = async (req, res) => {
      try {
            const bookID = Number(req.params.ID);
            if (!bookID) return res.status(400).json({ error: 'Invalid book ID' });

            const book = await Book.findByPk(bookID, { include: [Author, Category] });
            if (!book) return res.status(404).json({ error: 'Book not found' });

            res.status(200).json(book);
      } catch (err) {
            res.status(500).json({ error: err.message });
      }
};

exports.updateBook = async (req, res) => {
      try {
            const bookID = Number(req.params.ID);
            if (!bookID) return res.status(400).json({ error: 'Invalid book ID' });
            
            const existingBook = await Book.findOne({ where: { ID: bookID } });
            if (!existingBook) {
                  return res.status(404).json({ error: 'Book not found' });
            }

            const validationError = validateFields(['title', 'authorID', 'categoryID', 'publishedDate'], req.body);
            if (validationError) {
                  return res.status(400).json({ error: validationError });
            }

            const [updated] = await Book.update(req.body, {
                  where: { ID: bookID }
            });

            if (updated === 0) {
                  return res.status(404).json({ error: 'No changes detected or book not found' });
            }

            res.status(200).json({ message: 'Book updated successfully' });
      } catch (err) {
            res.status(500).json({ error: err.message });
      }
};

exports.deleteBook = async (req, res) => {
      try {
            const bookID = Number(req.params.ID);
            if (!bookID) return res.status(400).json({ error: 'Invalid book ID' });

            const existingBook = await Book.findOne({ where: { ID: bookID } });
            if (!existingBook) {
                  return res.status(404).json({ error: 'Book not found' });
            }

            const deleted = await Book.destroy({
                  where: { ID: bookID }
            });

            if (!deleted) return res.status(404).json({ error: 'Book not found' });

            res.status(200).json({ message: 'Book deleted successfully' });
      } catch (err) {
            res.status(500).json({ error: err.message });
      }
};