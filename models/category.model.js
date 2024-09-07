module.exports = (sequelize, DataTypes) => {
      const Category = sequelize.define('Category', {
            ID: {
                  type: DataTypes.INTEGER,
                  autoIncrement: true,
                  primaryKey: true
            },
            name: {
                  type: DataTypes.STRING,
                  allowNull: false
            }
      }, {
            timestamps: false,
            tablename: 'Categories'
      });

      return Category;
};