"use strict";

const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const userAdmin = [];
    const passwordUsersAdmin = "userAdmin2022";
    const pass = bcrypt.hashSync(passwordUsersAdmin, parseInt(process.env.SALT)); 

    for (let i = 0; i < 10; i++) {      


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
