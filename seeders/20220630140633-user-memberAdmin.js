'use strict';
const bcrypt = require("bcrypt");

module.exports = {
  up: (queryInterface, Sequelize) => {

    const passwordUserMemberAdmin = "MemberAdmin2022";
    const pass = bcrypt.hashSync(passwordUserMemberAdmin, parseInt(process.env.SALT)); 

    return queryInterface.bulkInsert('Users', [{
      firstName: 'John',
      lastName: 'Connor',
      email: 'connorJhon@gmail.com',
      password: pass,
      photo: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      roleId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};