"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Ticket, { foreignKey: "ticket_id", as: "ticket" });
      this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
    }
  }
  Notification.init(
    {
      user_id: DataTypes.INTEGER,
      has_read: DataTypes.BOOLEAN,
      ticket_id: DataTypes.INTEGER,
      message: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Notification",
    }
  );
  return Notification;
};
