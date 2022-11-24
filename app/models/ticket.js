'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Ticket.init({
    class: DataTypes.ENUM('Economy', 'Business', 'First'),
    price: DataTypes.INTEGER,
    invoice_number: DataTypes.INTEGER,
    flight_id: DataTypes.INTEGER,
    passenger_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Ticket',
  });
  return Ticket;
};