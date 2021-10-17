'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_pegawai extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  tb_pegawai.init({
    nip: DataTypes.STRING,
    nama: DataTypes.STRING,
    jabatan: DataTypes.STRING,
    foto: DataTypes.STRING,
    deskripsi: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tb_pegawai',
  });
  return tb_pegawai;
};