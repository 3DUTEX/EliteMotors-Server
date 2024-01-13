"use strict";/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'Reservations',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        vehicleID: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Vehicles',
            key: 'id',
          },
        },
        userID: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Users',
            key: 'id',
          },
        },
        visitDate: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        createdBy: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Reservations');
  },
};
