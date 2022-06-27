'use strict';

const { faker } = require('@faker-js/faker');
const  bcrypt = require('bcrypt')
require('dotenv').config()

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const userStandar = [];

    const passwordUsersStandar = "userStandar2022";
    const pass = bcrypt.hashSync(passwordUsersStandar, parseInt(process.env.SALT)); 
   
    for (let i = 0; i < 10; i++) {    
      
      
      userStandar.push({
        firstName:faker.name.firstName(),
        lastName:faker.name.lastName(),
        email:faker.internet.email(),
        password:pass,
        roleId:2,
        photo: faker.image.avatar(),
        createdAt: new Date,
        updatedAt: new Date
      });
    }
    await queryInterface.bulkInsert('Users',userStandar , {});
  },



  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};