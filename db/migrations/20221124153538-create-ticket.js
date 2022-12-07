"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Tickets", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      total_price: {
        type: Sequelize.INTEGER,
      },
      flight_type: {
        type: Sequelize.ENUM("Oneway", "Rundtrip"),
      },
      invoice_number: {
        type: Sequelize.INTEGER,
      },
      flight_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Flights", // tables name not model name
          key: "id",
        },
      },
      passenger_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users", // tables name not model name
          key: "id",
        },
      },
      flight_details: {
        type: Sequelize.INTEGER,
        references: {
          model: "FlightDetails", // tables name not model name
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
    await queryInterface.dropTable("Tickets");
  },
};
