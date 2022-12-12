const airportRepo = require("../repositories/airportsRepository");

async function getAirports() {
  try {
    return await airportRepo.getAirports();
  } catch (error) {
    throw error;
  }
}

async function getAirportById(id) {
  try {
    return await airportRepo.getAirportsById(id);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAirports,
  getAirportById,
};
