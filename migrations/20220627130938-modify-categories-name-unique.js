'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn(
        'Categories',
        'name',
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
      queryInterface.removeColumn('Categories', 'name'),
    ]);
  }
};