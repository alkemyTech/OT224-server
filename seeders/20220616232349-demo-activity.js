'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Activities', [{
      name: 'Activity Demo',
      content: 'Content Demo',
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
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
