'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_alternatif extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  tb_alternatif.init({
    kode_alternatif: {type:DataTypes.STRING,primaryKey:true},
    nama_alternatif: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tb_alternatif',
  });
  tb_alternatif.removeAttribute('id')
  return tb_alternatif;
};