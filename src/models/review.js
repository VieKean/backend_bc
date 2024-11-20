'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Quan hệ giữa Review và Customer
Review.belongsTo(models.Customer, { as: 'customer', foreignKey: 'customer_id' });

// Quan hệ giữa Review và Product
Review.belongsTo(models.Product, { as: 'product', foreignKey: 'product_id' });

    }
  };
  Review.init({
    customer_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    review_text: DataTypes.TEXT,
    review_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};