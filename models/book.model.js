module.exports = (sequelize, DataTypes) => {
      const Book = sequelize.define('Book', {
            ID: {
                  type: DataTypes.INTEGER,
                  autoIncrement: true,
                  primaryKey: true
            },
            title: {
                  type: DataTypes.STRING,
                  allowNull: false
            },
            authorID: {
                  type: DataTypes.INTEGER,
                  allowNull: false
            },
            categoryID: {
                  type: DataTypes.INTEGER,
                  allowNull: false
            },
            publishedDate: {
                  type: DataTypes.DATE,
                  allowNull: false
            }
      }, {
            timestamps: false,
            tablename: 'Books'
      });

      return Book;
};
