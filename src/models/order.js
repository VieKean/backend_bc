'use strict';
const { Model, DataTypes } = require('sequelize');  // Import Model and DataTypes

module.exports = (sequelize) => {
  class Order extends Model {
    static associate(models) {
      // Associations
      Order.belongsTo(models.Customer, { foreignKey: 'customer_id' });
      Order.hasMany(models.OrderDetail, { foreignKey: 'order_id' });
      Order.hasMany(models.OrderStatusHistory, { foreignKey: 'order_id' });
    }
  };

  Order.init({
    customer_id: DataTypes.INTEGER,
    order_date: DataTypes.DATE,
    total_price: DataTypes.DECIMAL,
    payment_method: DataTypes.STRING,
    status: DataTypes.STRING,
    total_products: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });

  return Order;
};
