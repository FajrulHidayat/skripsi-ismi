'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tb_pinjamans', {
      
      nik: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      nama: {
        type: Sequelize.STRING
      },
      jenis_usaha: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      alamat: {
        type: Sequelize.STRING
      },
      pendapatan: {
        type: Sequelize.BIGINT
      },
      kekayaan: {
        type: Sequelize.BIGINT
      },
      hasil: {
        type: Sequelize.BIGINT
      },
      foto: {
        type: Sequelize.STRING
      },
      lulus: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('tb_pinjamans');
  }
};