const { Airport } = require("../models");

async function getAirports() {
  try {
    return await Airport.findAll();
  } catch (error) {
    throw error;
  }
}

module.exports = { getAirports };
