const { Airport } = require("../models");

async function getAirports() {
  return await Airport.findAll({
    attributes: ["id", "iata", "name", "address"],
  });
}

async function getAirportsById(id) {
  return await Airport.findByPk(id, {
    attributes: ["id", "iata", "name", "address"],
  });
}

module.exports = {
  getAirports,
  getAirportsById,
};
