'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('OrderDetail', [{
      order_id: 1,
      product_id: 1,
      shipping_address: '123 Admin St',
      quantity: 2,
      order_notes: 'Please handle with care'
    }, {
      order_id: 2,
      product_id: 2,
      shipping_address: '456 User Ave',
      quantity: 1,
      order_notes: 'Send to front door'
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
