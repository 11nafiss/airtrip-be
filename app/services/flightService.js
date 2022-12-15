const flightsRepository = require("../repositories/flightsRepository");

async function searchFlights({ from, to, departureDate, flightClass }) {
  try {
    console.log(departureDate);
    departureDate = new Date(departureDate);
    console.log(departureDate);
    const flights = await flightsRepository.findFlights(
      departureDate,
      from,
      to,
      flightClass
    );

    return flights;
  } catch (error) {
    throw error;
  }
}

async function searchReturnFlights({
  from,
  to,
  returnFlightDate,
  arrivalDate,
  flightClass,
}) {
  try {
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
  } catch (error) {
    throw error;
  }
}

async function getAllFlights() {
  try {
    const flights = await flightsRepository.list();
    return flights;
  } catch (error) {
    throw error;
  }
}

async function createFlight(body) {
  try {
    const flight = await flightsRepository.createFlight(body);
    return flight;
  } catch (error) {
    throw error;
  }
}

async function updateFlight(id, updateArgs) {
  try {
    // check destination

    const flight = await flightsRepository.updateFlight(id, updateArgs);
    return flight;
  } catch (error) {
    throw error;
  }
}

async function getFlightById(id) {
  try {
    const flight = await flightsRepository.getFlightById(id);
    return flight;
  } catch (error) {
    throw error;
  }
}

async function deleteFlight(id) {
  try {
    const flight = await flightsRepository.deleteFlight(id);
  } catch (error) {
    throw error;
  }
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
