const { Author } = require('../models');

function validateFields(requiredFields, reqBody) {
      const missingFields = requiredFields.filter(field => !reqBody[field]);
      return missingFields.length === 0 ? null : `Missing required fields: ${missingFields.join(', ')}`;
}

exports.addAuthor = async (req, res) => {
      try {
            const validationError = validateFields(['name'], req.body);
            if (validationError) {
                  return res.status(400).json({ error: validationError });
            }

            const author = await Author.create({ name: req.body.name });
            res.status(201).json(author);
      } catch (err) {
            res.status(500).json({ error: err.message });
      }
};

exports.getAllAuthors = async (req, res) => {
      try {
            const authors = await Author.findAll();
            res.status(200).json(authors);
      } catch (err) {
            res.status(500).json({ error: err.message });
      }
};

exports.getAuthorByID = async (req, res) => {
      try {
            const authorID = Number(req.params.ID);
            if (!authorID) return res.status(400).json({ error: 'Invalid author ID' });

            const existingAuthor = await Author.findOne({ where: { ID: authorID } });
            if (!existingAuthor) {
                  return res.status(404).json({ error: 'Author not found' });
            }

            const author = await Author.findByPk(authorID);
            if (!author) return res.status(404).json({ error: 'Author not found' });

            res.status(200).json(author);
      } catch (err) {
            res.status(500).json({ error: err.message });
      }
};

exports.updateAuthor = async (req, res) => {
      try {
            const authorID = Number(req.params.ID);
            if (!authorID) return res.status(400).json({ error: 'Invalid author ID' });

            const validationError = validateFields(['name'], req.body);
            if (validationError) {
                  return res.status(400).json({ error: validationError });
            }

            const [updated] = await Author.update(req.body, {
                  where: { ID: authorID }
            });

            if (updated === 0) return res.status(404).json({ error: 'Author not found' });

            res.status(200).json({ message: 'Author updated successfully' });
      } catch (err) {
            res.status(500).json({ error: err.message });
      }
};

exports.deleteAuthor = async (req, res) => {
      try {
            const authorID = Number(req.params.ID);
            if (!authorID) return res.status(400).json({ error: 'Invalid author ID' });

            const existingAuthor = await Author.findOne({ where: { ID: authorID } });
            if (!existingAuthor) {
                  return res.status(404).json({ error: 'Author not found' });
            }

            const deleted = await Author.destroy({
                  where: { ID: authorID }
            });

            if (!deleted) return res.status(404).json({ error: 'Author not found' });

            res.status(200).json({ message: 'Author deleted successfully' });
      } catch (err) {
            res.status(500).json({ error: err.message });
      }
};