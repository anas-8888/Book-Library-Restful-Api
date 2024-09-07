const Sequelize = require('sequelize');
const sequelize = require('../config/db.config');

const Author = require('./author.model')(sequelize, Sequelize.DataTypes);
const Category = require('./category.model')(sequelize, Sequelize.DataTypes);
const Book = require('./book.model')(sequelize, Sequelize.DataTypes);

Author.hasMany(Book, { foreignKey: 'authorID' });
Category.hasMany(Book, { foreignKey: 'categoryID' });
Book.belongsTo(Author, { foreignKey: 'authorID' });
Book.belongsTo(Category, { foreignKey: 'categoryID' });

module.exports = {
      sequelize,
      Author,
      Category,
      Book
};