'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Slides', 'thumbnailUrl',
    {
      type: Sequelize.STRING,
      allowNull: false
    },
    {
      after: 'imageUrl'
    }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Slides','thumbnailUrl')
  }
};
