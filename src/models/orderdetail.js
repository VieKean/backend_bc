//models/orderdetail.js
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      OrderDetail.belongsTo(models.Order, { foreignKey: 'order_id' });
  OrderDetail.belongsTo(models.Product, { foreignKey: 'product_id' });
    }
  };
  OrderDetail.init({
    product_id: DataTypes.INTEGER,
    shipping_address: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    order_notes: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'OrderDetail',
  });
  return OrderDetail;
};