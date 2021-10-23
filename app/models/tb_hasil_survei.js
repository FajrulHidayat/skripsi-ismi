'use strict';
const {
  Model
} = require('sequelize');
const db = require('../../config/connection')
// const {tb_alternatif} =require('./')
module.exports = (sequelize, DataTypes) => {
  class tb_hasil_survei extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // console.log(models);
      tb_hasil_survei.hasOne(models.tb_pinjaman,{foreignKey:'nik',sourceKey:'kode_alternatif'});
      tb_hasil_survei.belongsTo(models.tb_pinjaman,{foreignKey:'kode_alternatif',targetKey:'nik'})
    }
  };
  tb_hasil_survei.init({
    id_hasil_survei: DataTypes.INTEGER,
    kode_kriteria: DataTypes.STRING,
    kode_alternatif: DataTypes.STRING,
    nilai: DataTypes.INTEGER,
    bobot: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tb_hasil_survei',
  });
  
  tb_hasil_survei.removeAttribute('id')
  return tb_hasil_survei;
};