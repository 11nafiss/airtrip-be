const flightsRepository = require("../repositories/flightsRepository");

async function searchFlights({
  from,
  to,
  flight_date,
  return_flight_date,
  flight_type,
  flight_class,
}) {
  try {
    flight_date = new Date(flight_date);
    return_flight_date = new Date(return_flight_date);

    const flights = await flightsRepository.findFlights(
      flight_date,
      from,
      to,
      flight_class
    );

    let returnFlights = [];

    if (flight_type?.toLowerCase() === "round trip" && return_flight_date) {
      let maxFlightDate = null;
      flights.forEach((flight) => {
        if (maxFlightDate === null || flight.arrival > maxFlightDate) {
          maxFlightDate = flight.arrival;
        }
      });
      console.log("first");
      returnFlights = await flightsRepository.findReturnFlights(
        maxFlightDate,
        return_flight_date,
        from,
        to,
        flight_class
      );
    }
    return { flights, return_flights: returnFlights };
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

module.exports = {
  searchFlights,
  createFlight,
  updateFlight,
  getFlightById,
};
