'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.changeColumn(
        'Contacts',
        'email',
        {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        }
        ),
      ]);
    },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.removeColumn('Contacts', 'email'),
    ]);
  }
};