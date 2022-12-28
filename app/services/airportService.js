const airportRepo = require("../repositories/airportsRepository");

async function getAirports() {
  return await airportRepo.getAirports();
}

async function getAirportById(id) {
  return await airportRepo.getAirportsById(id);
}

module.exports = {
  getAirports,
  getAirportById,
};
