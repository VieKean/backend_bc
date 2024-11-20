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
    await queryInterface.bulkInsert('Order', [{
      customer_id: 1,
      order_date: new Date(),
      total_price: 100.00,
      payment_method: 'credit_card',
      status: 'pending',
      total_products: 2
    }, {
      customer_id: 2,
      order_date: new Date(),
      total_price: 150.00,
      payment_method: 'paypal',
      status: 'shipped',
      total_products: 3
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
