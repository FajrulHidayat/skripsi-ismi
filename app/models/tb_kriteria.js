'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_kriteria extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  tb_kriteria.init({
    kode_kriteria: DataTypes.STRING,
    nama_kriteria: DataTypes.STRING,
    bobot: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tb_kriteria',
  });
  tb_kriteria.removeAttribute('id')
  return tb_kriteria;
};