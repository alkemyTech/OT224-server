'use strict';

const { faker } = require('@faker-js/faker');
const  bcrypt = require('bcrypt')
require('dotenv').config()

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const userRegular = [];
   
    for (let i = 0; i < 10; i++) {    
      
      const pass = bcrypt.hashSync(faker.internet.password(), parseInt(process.env.SALT)); 

      userRegular.push({
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
    await queryInterface.bulkInsert('Users',userRegular , {});
  },



  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};