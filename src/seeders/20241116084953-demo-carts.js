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
    await queryInterface.bulkInsert('Cart', [{
      customer_id: 1,
      product_id: 1,
      quantity: 2,
      price: 50.00,
      image: 'keyboard_image_url'
    }, {
      customer_id: 2,
      product_id: 2,
      quantity: 1,
      price: 75.00,
      image: 'mouse_image_url'
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
