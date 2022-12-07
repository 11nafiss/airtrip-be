"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BoardingPass extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BoardingPass.init(
    {
      flight_id: DataTypes.INTEGER,
      ticket_id: DataTypes.INTEGER,
      passenger_id: DataTypes.INTEGER,
      has_checked_in: DataTypes.BOOLEAN,
      has_boarded: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "BoardingPass",
    }
  );
  return BoardingPass;
};
