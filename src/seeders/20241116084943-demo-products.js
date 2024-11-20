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
    await queryInterface.bulkInsert('Product', [
      {
        product_name: 'Keychron K4',
        price: 120.00,
        image: 'keychron_k4.jpg',
        description: 'A popular mechanical keyboard',
        category_id: 1,
        quantity: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_name: 'Ducky One 2 Mini',
        price: 100.00,
        image: 'ducky_one_2_mini.jpg',
        description: 'A compact 60% mechanical keyboard',
        category_id: 1,
        quantity: 30,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
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
