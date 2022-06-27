"use strict";

const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const userAdmin = [];



    for (let i = 0; i < 10; i++) {    
      
      const pass = bcrypt.hashSync(faker.internet.password(), parseInt(process.env.SALT)); 


      userAdmin.push({
        firstName:faker.name.firstName(),
        lastName:faker.name.lastName(),
        email:faker.internet.email(),
        password:pass,
        roleId:1,
        photo: faker.image.avatar(),
        createdAt: new Date,
        updatedAt: new Date
      });
    }
    await queryInterface.bulkInsert("Users", userAdmin, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
