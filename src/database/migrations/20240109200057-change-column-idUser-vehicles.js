/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      'Vehicles',
      'idUser',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Vehicles');
  },
};
