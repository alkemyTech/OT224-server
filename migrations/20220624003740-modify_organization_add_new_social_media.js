'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Organizations',
        'facebookUrl', 
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Organizations',
        'linkedinUrl',
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Organizations',
        'instagramUrl',
        {
          type: Sequelize.TEXT,
          allowNull: true,
        },
      ),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Organizations', 'facebookUrl'),
      queryInterface.removeColumn('Organizations', 'linkedinUrl'),
      queryInterface.removeColumn('Organizations', 'instagramUrl'),
    ]);
  }
};
