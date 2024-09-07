const { Category } = require('../models');

function validateFields(requiredFields, reqBody) {
      const missingFields = requiredFields.filter(field => !reqBody[field]);
      return missingFields.length === 0 ? null : `Missing required fields: ${missingFields.join(', ')}`;
}

exports.addCategory = async (req, res) => {
      try {
            const validationError = validateFields(['name'], req.body);
            if (validationError) {
                  return res.status(400).json({ error: validationError });
            }

            const category = await Category.create({ name: req.body.name });
            res.status(201).json(category);
      } catch (err) {
            res.status(500).json({ error: err.message });
      }
};

exports.getAllCategories = async (req, res) => {
      try {
            const categories = await Category.findAll();
            res.status(200).json(categories);
      } catch (err) {
            res.status(500).json({ error: err.message });
      }
};

exports.getCategoryByID = async (req, res) => {
      try {
            const categoryID = Number(req.params.ID);
            if (!categoryID) return res.status(400).json({ error: 'Invalid category ID' });

            const existingCategory = await Category.findOne({ where: { ID: categoryID } });
            if (!existingCategory) {
                  return res.status(404).json({ error: 'Category not found' });
            }

            const category = await Category.findByPk(categoryID);
            if (!category) return res.status(404).json({ error: 'Category not found' });

            res.status(200).json(category);
      } catch (err) {
            res.status(500).json({ error: err.message });
      }
};

exports.updateCategory = async (req, res) => {
      try {
            const categoryID = Number(req.params.ID);
            if (!categoryID) return res.status(400).json({ error: 'Invalid category ID' });

            const validationError = validateFields(['name'], req.body);
            if (validationError) {
                  return res.status(400).json({ error: validationError });
            }

            const [updated] = await Category.update(req.body, {
                  where: { ID: categoryID }
            });

            if (updated === 0) return res.status(404).json({ error: 'Category not found' });

            res.status(200).json({ message: 'Category updated successfully' });
      } catch (err) {
            res.status(500).json({ error: err.message });
      }
};

exports.deleteCategory = async (req, res) => {
      try {
            const categoryID = Number(req.params.ID);
            if (!categoryID) return res.status(400).json({ error: 'Invalid category ID' });

            const existingCategory = await Category.findOne({ where: { ID: categoryID } });
            if (!existingCategory) {
                  return res.status(404).json({ error: 'Category not found' });
            }

            const deleted = await Category.destroy({
                  where: { ID: categoryID }
            });

            if (!deleted) return res.status(404).json({ error: 'Category not found' });

            res.status(200).json({ message: 'Category deleted successfully' });
      } catch (err) {
            res.status(500).json({ error: err.message });
      }
};