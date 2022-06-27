'use strict';
const { faker } =require('@faker-js/faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      roleId: 2,
      photo: faker.image.avatar(),
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      roleId: 2,
      photo: faker.image.avatar(),
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      roleId: 2,
      photo: faker.image.avatar(),
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      roleId: 2,
      photo: faker.image.avatar(),
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      roleId: 2,
      photo: faker.image.avatar(),
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      roleId: 2,
      photo: faker.image.avatar(),
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      roleId: 2,
      photo: faker.image.avatar(),
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      roleId: 2,
      photo: faker.image.avatar(),
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      roleId: 2,
      photo: faker.image.avatar(),
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      roleId: 2,
      photo: faker.image.avatar(),
      createdAt: new Date,
      updatedAt: new Date
    }], {});
  },


  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
