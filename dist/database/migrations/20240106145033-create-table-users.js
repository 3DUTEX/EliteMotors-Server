"use strict";/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'Users',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        name: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        email: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        password_hash: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        level_access: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        isGoogleAccount: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
      },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  },
};
