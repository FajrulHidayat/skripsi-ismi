'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tb_hasil_surveis', {
    
      id_hasil_survei: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      kode_kriteria: {
        type: Sequelize.STRING
      },
      kode_alternatif: {
        type: Sequelize.STRING
      },
      nilai: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('tb_hasil_surveis');
  }
};