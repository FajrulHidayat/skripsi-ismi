'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_pinjaman extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  tb_pinjaman.init({
    nik: DataTypes.STRING,
    nama: DataTypes.STRING,
    jenis_usaha: DataTypes.STRING,
    email: DataTypes.STRING,
    alamat: DataTypes.STRING,
    pendapatan: DataTypes.BIGINT,
    kekayaan: DataTypes.BIGINT,
    hasil: DataTypes.BIGINT,
    foto: DataTypes.STRING,
    lulus: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'tb_pinjaman',
  });
  tb_pinjaman.removeAttribute('id')
  return tb_pinjaman;
};