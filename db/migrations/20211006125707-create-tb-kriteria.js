'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tb_kriteria', {
    
      kode_kriteria: {
        primaryKey: true,
        type: Sequelize.STRING
      },
      nama_kriteria: {
        type: Sequelize.STRING
      },
      bobot: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tb_kriteria');
  }
};