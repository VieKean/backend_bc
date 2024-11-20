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
    await queryInterface.bulkInsert('Customer', [{
      username: 'customer1',
      password: 'customer123',
      full_name: 'Customer One',
      address: '789 Customer Blvd',
      phone_number: '321-654-9870',
      email: 'customer1@example.com',
      creation_date: new Date(),
      birth_date: new Date(1990, 0, 1),
      gender: 'male'
    }, {
      username: 'customer2',
      password: 'customer456',
      full_name: 'Customer Two',
      address: '101 Customer Rd',
      phone_number: '456-789-1230',
      email: 'customer2@example.com',
      creation_date: new Date(),
      birth_date: new Date(1992, 5, 15),
      gender: 'female'
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
