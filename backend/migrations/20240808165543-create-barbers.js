module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Barbers', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      hireDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      specialties: {
        type: Sequelize.JSON, // Alterado para JSON
        allowNull: false,
        defaultValue: [],
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Barbers');
  }
};
