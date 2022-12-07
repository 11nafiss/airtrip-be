'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FlightDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FlightDetail.init({
    boarding_pass_pergi: DataTypes.INTEGER,
    boarding_pass_pulang: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'FlightDetail',
  });
  return FlightDetail;
};