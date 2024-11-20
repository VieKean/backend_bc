'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      // Existing associations
      Product.hasMany(models.Review, { foreignKey: 'product_id' });
      Product.hasMany(models.Cart, { foreignKey: 'product_id' });
      Product.hasMany(models.OrderDetail, { foreignKey: 'product_id' });

      // Add the reverse association: Product belongs to Category
      Product.belongsTo(models.Category, { foreignKey: 'category_id'}); // Adding this line
    }
  };
  Product.init({
    product_name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    image: DataTypes.STRING,
    description: DataTypes.TEXT,
    category_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
