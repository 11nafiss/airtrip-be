const airportRepo = require("../repositories/airportsRepository");

async function getAirports() {
  try {
    return await airportRepo.getAirports();
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAirports,
};
