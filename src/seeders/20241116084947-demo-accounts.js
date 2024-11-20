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
    await queryInterface.bulkInsert('Account', [{
      username: 'admin',
      password: 'admin123', 
      full_name: 'Admin User',
      address: '123 Admin St',
      phone_number: '123-456-7890',
      email: 'admin@example.com',
      role: 'admin',
      creation_date: new Date()
    }, {
      username: 'user1',
      password: 'user123',
      full_name: 'User One',
      address: '456 User Ave',
      phone_number: '987-654-3210',
      email: 'user1@example.com',
      role: 'user',
      creation_date: new Date()
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
