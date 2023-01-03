"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Wishlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Flight, { foreignKey: "flight_id", as: "flight" });
      this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
    }
  }
  Wishlist.init(
    {
      user_id: DataTypes.INTEGER,
      flight_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Wishlist",
    }
  );
  return Wishlist;
};
