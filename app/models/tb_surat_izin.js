'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_surat_izin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  tb_surat_izin.init({
    nik: DataTypes.STRING,
    nama: DataTypes.STRING,
    jenis_usaha: DataTypes.STRING,
    email: DataTypes.STRING,
    alamat: DataTypes.STRING,
    foto: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tb_surat_izin',
  });
  tb_surat_izin.removeAttribute('id')
  return tb_surat_izin;
};