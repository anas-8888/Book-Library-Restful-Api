module.exports = (sequelize, DataTypes) => {
      const Author = sequelize.define('Author', {
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
            tablename: 'Authors'
      });

      return Author;
};