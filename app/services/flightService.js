const flightsRepository = require("../repositories/flightsRepository");

async function searchFlights({ departure, from, to }) {
  try {
    const result = await flightsRepository.findFlights(
      new Date(departure),
      from,
      to
    );
    return result;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  searchFlights,
};
