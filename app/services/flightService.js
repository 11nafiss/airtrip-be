const flightsRepository = require("../repositories/flightsRepository");

async function searchFlights({ departure_date, from, to }) {
  try {
    const result = await flightsRepository.findFlights(
      new Date(departure_date),
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
