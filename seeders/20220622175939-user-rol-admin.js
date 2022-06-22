'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      firstName: 'Admin',
      lastName: 'none',
      email: 'Admin@test.com',
      // Important: Password not encrypted yet! 
      password: '1234',
      roleId: 1,
      photo: 'https://www.freepng.es/png-p3b3eu/',
      createdAt: new Date,
      updatedAt: new Date
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
