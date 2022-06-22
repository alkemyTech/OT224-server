'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Contacts', [{
      name: 'John',
      phone: '375501966',
      email: 'example@example.com',
      message:'mensaje de Jhon',
      deletedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'John',
      phone: '375501966',
      email: 'example@example.com',
      message:'Nuevo mensaje de Jhon',
      deletedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]
  , {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Contacts', null, {});
     
  }
};
