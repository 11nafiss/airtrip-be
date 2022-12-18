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
      invoice_number: {
        type: Sequelize.STRING,
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
          model: "Flight_Details", // tables name not model name
          key: "id",
        },
      },
      has_read: {
        type: Sequelize.BOOLEAN,
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
