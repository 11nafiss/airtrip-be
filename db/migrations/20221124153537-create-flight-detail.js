"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("FlightDetails", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      boarding_pass_pergi: {
        type: Sequelize.INTEGER,
        references: {
          model: "BoardingPasses", // tables name not model name
          key: "id",
        },
      },
      boarding_pass_pulang: {
        type: Sequelize.INTEGER,
        references: {
          model: "BoardingPasses", // tables name not model name
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("FlightDetails");
  },
};
