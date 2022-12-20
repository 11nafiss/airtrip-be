"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Airplane extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Flight, { foreignKey: "airplane_id" });
    }
  }
  Airplane.init(
    {
      image: DataTypes.STRING,
      model_number: DataTypes.STRING,
      manufacture: DataTypes.STRING,
      capacity: DataTypes.INTEGER,
      specs: DataTypes.ARRAY(DataTypes.STRING),
    },
    {
      sequelize,
      modelName: "Airplane",
      paranoid: true,
    }
  );
  return Airplane;
};
