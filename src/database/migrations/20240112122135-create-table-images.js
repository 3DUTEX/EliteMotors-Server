/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'Images',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        storageID: {
          type: Sequelize.TEXT,
          allowNull: false,
          unique: true,
        },
        url: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        vehicleID: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Vehicles',
            key: 'id',
          },
        },
      },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Images');
  },
};
