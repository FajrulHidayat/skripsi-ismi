'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_informasi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  tb_informasi.init({
    title: DataTypes.STRING,
    value: DataTypes.STRING,
    tipe: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tb_informasi',
  });
  tb_informasi.removeAttribute('id')
  return tb_informasi;
};