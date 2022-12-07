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
      flight_type: {
        type: Sequelize.ENUM("Oneway", "Roundtrip"),
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
<<<<<<<< HEAD:db/migrations/20221124153538-create-ticket.js
          model: "FlightDetails", // tables name not model name
========
          model: "Flight_Details", // tables name not model name
>>>>>>>> database-sprint-2:db/migrations/20221207140930-create-ticket.js
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
