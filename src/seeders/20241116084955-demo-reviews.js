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
    await queryInterface.bulkInsert('Review', [{
      customer_id: 1,
      product_id: 1,
      rating: 5,
      review_text: 'Great keyboard! Highly recommend it.',
      review_date: new Date()
    }, {
      customer_id: 2,
      product_id: 2,
      rating: 4,
      review_text: 'Good mouse, but a bit expensive.',
      review_date: new Date()
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
