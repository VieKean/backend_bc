module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('orderstatushistory', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      order_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'order',  
          key: 'id',
        },
        allowNull: false,
      },
      old_status: {
        type: Sequelize.STRING,  // Trạng thái cũ
        allowNull: false,
      },
      new_status: {
        type: Sequelize.STRING,  // Trạng thái mới
        allowNull: false,
      },
      updated_by: {
        type: Sequelize.STRING,  // Ai thay đổi (người dùng, admin)
        allowNull: false,
      },
      change_reason: {
        type: Sequelize.STRING,  // Lý do thay đổi trạng thái
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('orderstatushistory');
  },
};
