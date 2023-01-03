"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Airport, {
        foreignKey: "from",
        as: "from_airport",
      });
      this.belongsTo(models.Airport, {
        foreignKey: "to",
        as: "to_airport",
      });
      this.belongsTo(models.Airplane, {
        foreignKey: "airplane_id",
        as: "airplane",
      });
      this.hasMany(models.BoardingPass, { foreignKey: "flight_id" });
      this.hasMany(models.Wishlist, { foreignKey: "flight_id" });
    }
  }
  Flight.init(
    {
      departure: DataTypes.DATE,
      arrival: DataTypes.DATE,
      flight_class: DataTypes.ENUM("Economy", "Business", "First"),
      price: DataTypes.INTEGER,
      from: DataTypes.INTEGER,
      to: DataTypes.INTEGER,
      airplane_id: DataTypes.INTEGER,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Flight",
      paranoid: true,
    }
  );
  return Flight;
};
