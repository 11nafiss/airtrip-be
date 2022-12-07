"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Flights", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      departure: {
        type: Sequelize.DATE,
      },
      arrival: {
        type: Sequelize.DATE,
      },
      class: {
        type: Sequelize.ENUM("Economy", "Bussiness", "First"),
      },
      price: {
        type: Sequelize.INTEGER,
      },
      from: {
        type: Sequelize.INTEGER,
        references: {
          model: "Airports",
          key: "id",
        },
      },
      to: {
        type: Sequelize.INTEGER,
        references: {
          model: "Airports",
          key: "id",
        },
      },
      airplane_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Airplanes", // tables name not model name
          key: "id",
        },
      },
      description: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("Flights");
  },
};
