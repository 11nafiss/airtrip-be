"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Role, {
        foreignKey: "role_id",
      });
      this.hasMany(models.BoardingPass, {
        foreignKey: "passenger_id",
      });

      this.hasMany(models.Ticket, {
        foreignKey: "passenger_id",
        as: "passenger",
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      saldo: DataTypes.INTEGER,
      email: DataTypes.STRING,
      encryptedPassword: DataTypes.STRING,
      verified: DataTypes.BOOLEAN,
      role_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
