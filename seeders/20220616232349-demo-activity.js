'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Activities', [{
      name: 'Activity Demo',
      content: 'Content Demo',
      image: 'https://busytoddler.com/wp-content/uploads/2020/03/bigkid-activities.jpg',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      name: 'Activity Demo 2',
      content: 'Content Demo 2',
      image: 'https://www.peanuts.com/sites/default/files/takecare_familycenter_activities.png',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      name: 'Activity Demo 3',
      content: 'Content Demo 3',
      image: 'https://static.meraevents.com/content/categorylogo/Activities-thumb1582184387.jpg',
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
