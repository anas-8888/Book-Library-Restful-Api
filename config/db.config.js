const { Sequelize } = require('sequelize');
require('dotenv').config();

const dataBasePassword = process.env.DB_PASS;

const sequelize = new Sequelize('book_library', 'root', dataBasePassword, {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;