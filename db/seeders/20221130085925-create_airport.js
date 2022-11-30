"use strict";

const fs = require("fs");
const getAirport = require("../getAirport");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = getAirport.read();
    const timestamp = new Date();

    const airports = data.map((airport) => ({
      country_code: airport.country_iso,
      name: airport.name,
      iata: airport.iata,
      icao: airport.icao,
      logo: null,
      address: airport.location,
      phone: airport.phone,
      website: airport.website,
      createdAt: timestamp,
      updatedAt: timestamp,
    }));

    await queryInterface.bulkInsert("Airports", airports, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Airports", null, {});
  },
};
