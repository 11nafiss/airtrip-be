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
      this.belongsTo(models.Flight, { foreignKey: "flight_id", as: "flight" });
      this.belongsTo(models.User, {
        foreignKey: "passenger_id",
        as: "passenger",
      });
      this.hasOne(models.Flight_Detail, { foreignKey: "boarding_pass_pergi" });
      this.hasOne(models.Flight_Detail, {
        foreignKey: "boarding_pass_pulang",
      });
    }
  }
  BoardingPass.init(
    {
      flight_id: DataTypes.INTEGER,
      passenger_id: DataTypes.INTEGER,
      seat: DataTypes.STRING,
      has_checked_in: DataTypes.BOOLEAN,
      has_boarded: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "BoardingPass",
    }
  );
  return BoardingPass;
};
