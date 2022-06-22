'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      firstName: 'userStandar',
      lastName: 'none',
      email: 'userStandar@test.com',
      // Important: Password not encrypted yet! 
      password: '1234',
      roleId: 2,
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

