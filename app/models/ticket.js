"use strict";
const { Model } = require("sequelize");
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
  Ticket.init(
    {
      total_price: DataTypes.INTEGER,
      invoice_number: DataTypes.INTEGER,
      flight_type: DataTypes.ENUM("Oneway", "Roundtrip"),
      passenger_id: DataTypes.INTEGER,
      flight_details: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Ticket",
    }
  );
  return Ticket;
};