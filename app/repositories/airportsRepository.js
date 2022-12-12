const { Airport } = require("../models");

async function getAirports() {
  try {
    return await Airport.findAll({
      attributes: ["id", "iata", "name", "address"],
    });
  } catch (error) {
    throw error;
  }
}

async function getAirportsById(id) {
  try {
    return await Airport.findByPk(id, {
      attributes: ["id", "iata", "name", "address"],
    });
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAirports,
  getAirportsById,
};
