'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Activities', [{
      name: 'Apoyo Escolar Para El Nivel Primario',
      content: 'El espacio de apoyo es el corazón del área educativa.',
      image: 'https://busytoddler.com/wp-content/uploads/2020/03/bigkid-activities.jpg',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      name: 'Apoyo Escolar Nivel Secundario',
      content: 'Del mismo modo que en primaria, este taller es el corazón del área secundaria.',
      image: 'https://www.peanuts.com/sites/default/files/takecare_familycenter_activities.png',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      name: 'Tutorías',
      content: 'Es un programa destinado a jóvenes a partir del tercer año de secundaria, cuyo objetivo es garantizar su permanencia en la escuela y construir un proyecto de vida que da sentido al colegio.',
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
