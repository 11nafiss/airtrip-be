"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("BoardingPasses", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      flight_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Flights", // tables name not model name
          key: "id",
        },
      },
      ticket_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Tickets", // tables name not model name
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
      has_checked_in: {
        type: Sequelize.BOOLEAN,
      },
      has_boarded: {
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
    await queryInterface.dropTable("BoardingPasses");
  },
};
