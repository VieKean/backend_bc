module.exports = (sequelize, DataTypes) => {
  const OrderStatusHistory = sequelize.define('OrderStatusHistory', {
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    old_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    new_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    updated_by: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    change_reason: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    timestamps: false,
  });

  // Add the association
  OrderStatusHistory.associate = function(models) {
    // Ensure that OrderStatusHistory belongs to Order
    OrderStatusHistory.belongsTo(models.Order, { foreignKey: 'order_id' });
  };

  return OrderStatusHistory;
};
