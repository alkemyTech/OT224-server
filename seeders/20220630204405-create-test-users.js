'use strict';
const bcrypt = require("bcrypt");
const password = bcrypt.hashSync('1234test', parseInt(process.env.SALT));
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      firstName: 'Nombre Test regular',
      lastName: 'Apellido Test regular',
      email: 'regular@test.com',
      password,
      roleId: 2,
      photo: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    }], {});
    await queryInterface.bulkInsert('Users', [{
      firstName: 'Nombre Test admin',
      lastName: 'Apellido Test admin',
      email: 'admin@test.com',
      password,
      roleId: 1,
      photo: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Users', {email: {[Op.in]: ['regular@test.com', 'admin@test.com']}}, {});
  }
};
