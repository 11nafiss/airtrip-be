const flightService = require("../../../services/flightService");
const airportService = require("../../../services/airportService");

async function handleSearchFlights(req, res, next) {
  try {
    /*
    req.body = {from, to, flight_date, return_flight_date, flight_type, flight_class}
    */

    const flights = await flightService.searchFlights(req.body);

    res.status(200).json({ data: flights });
  } catch (error) {
    req.error = error;
    next();
  }
}

async function handleCreateFlight(req, res, next) {
  try {
    console.log("=== masuk try handleCreateFlight ===");
    /*
        req.body = {
          departure,
          arrival, 
          class,
          price,
          from,
          to,
          airplane_id,
          descripttion,
        }
    */

    // get the departure address
    const from = await airportService.getAirportById(req.body.from);

    console.log("from", from);

    // add checking here

    // add checking here

    // get the arrival address
    const to = await airportService.getAirportById(req.body.to);

    console.log("to", to);

    // add checking here

    // add checking here

    // get the airplane data

    // const airplane = await

    const flight = await flightService.createFlight(req.body);
    console.log("flight", flight);

    // return the response
    res.status(201).json({ data: flight });
  } catch (error) {
    console.log("=== masuk catch handleCreateFlight ===");
    res.status(422).json(error);
    next();
  }
}

module.exports = {
  handleSearchFlights,
  handleCreateFlight,
};
