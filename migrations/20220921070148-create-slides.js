
'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Slides', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        text: {
            allowNull: false,
            type: Sequelize.STRING
        },
        order: {
            allowNull: false,
            type: Sequelize.INTEGER
        },
        imageUrl: {
            allowNull: false,
            type: Sequelize.STRING
        },
        organizationId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Organizations',
                key: 'id'
            }
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        deletedAt: {
            allowNull: false,
            type: Sequelize.DATE
        }
    });
    },
    down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Slides');
    }
};