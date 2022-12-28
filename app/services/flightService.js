const flightsRepository = require("../repositories/flightsRepository");

async function searchFlights({ from, to, departureDate, flightClass }) {
  departureDate = new Date(departureDate);

  const flights = await flightsRepository.findFlights(
    departureDate,
    from,
    to,
    flightClass
  );

  return flights;
}

async function searchReturnFlights({
  from,
  to,
  returnFlightDate,
  arrivalDate,
  flightClass,
}) {
  returnFlightDate = new Date(returnFlightDate);
  arrivalDate = new Date(arrivalDate);
  const flights = await flightsRepository.findReturnFlights(
    returnFlightDate,
    arrivalDate,
    from,
    to,
    flightClass
  );

  return flights;
}

async function getAllFlights() {
  const flights = await flightsRepository.list();
  return flights;
}

async function createFlight(body) {
  const flight = await flightsRepository.createFlight(body);
  return flight;
}

async function updateFlight(id, updateArgs) {
  // check destination

  const flight = await flightsRepository.updateFlight(id, updateArgs);
  return flight;
}

async function getFlightById(id) {
  const flight = await flightsRepository.getFlightById(id);
  return flight;
}

async function deleteFlight(id) {
  const flight = await flightsRepository.deleteFlight(id);
}

module.exports = {
  getAllFlights,
  searchFlights,
  searchReturnFlights,
  createFlight,
  updateFlight,
  getFlightById,
  deleteFlight,
};
