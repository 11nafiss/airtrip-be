'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Flight.init({
    departure_date: DataTypes.DATE,
    departure_time: DataTypes.TIME,
    flight_type: DataTypes.ENUM('Oneway', 'Rundtrip'),
    from: DataTypes.INTEGER,
    to: DataTypes.INTEGER,
    airplane_id: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Flight',
  });
  return Flight;
};