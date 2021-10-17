'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  tb_user.init({
    nik: DataTypes.STRING,
    nama: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tb_user',
  });
  tb_user.removeAttribute('id')
  return tb_user;
};