"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Flight_Detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.BoardingPass, {
        foreignKey: "boarding_pass_pulang",
        as: "boarding_pass_return",
      });
      this.belongsTo(models.BoardingPass, {
        foreignKey: "boarding_pass_pergi",
        as: "boarding_pass",
      });
      this.hasOne(models.Ticket, { foreignKey: "flight_details" });
    }
  }
  Flight_Detail.init(
    {
      boarding_pass_pergi: DataTypes.INTEGER,
      boarding_pass_pulang: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Flight_Detail",
    }
  );
  return Flight_Detail;
};
