const flightService = require("../../../services/flightService");
const airportService = require("../../../services/airportService");
const airplaneService = require("../../../services/airplaneService");

const { RecordNotFoundError } = require("../../../errors");

async function handleSearchFlights(req, res, next) {
  try {
    /*
    req.body = {from, to, departureDate, flightClass}
    */

    const flights = await flightService.searchFlights(req.body);

    res.status(200).json({ data: flights });
  } catch (error) {
    req.error = error;
    next();
  }
}
async function handleSearchReturnFlights(req, res, next) {
  // req.body = {from, to, returnFlightDate,  arrivalDate, flightClass}
  try {
    const flights = await flightService.searchReturnFlights(req.body);

    res.status(200).json({ data: flights });
  } catch (error) {
    req.error = error;
    next();
  }
}

async function handleCreateFlight(req, res, next) {
  try {
    // get the departure address
    const from = await airportService.getAirportById(req.body.from);

    // add checking here
    if (!from) {
      const msg = `airport with id ${req.body.from}`;
      const err = new RecordNotFoundError(msg);
      res.status(404).json(err);
      return;
    }

    // add checking here

    // get the arrival address
    const to = await airportService.getAirportById(req.body.to);

    // add checking here
    if (!to) {
      const msg = `airport with id ${req.body.to}`;
      const err = new RecordNotFoundError(msg);
      res.status(404).json(err);
      return;
    }

    // get the airplane data
    const airplane = await airplaneService.getAirplaneById(
      req.body.airplane_id
    );

    if (!airplane) {
      const msg = `airplane with id ${req.body.airplane_id}`;
      const err = new RecordNotFoundError(msg);
      res.status(404).json(err);
      return;
    }

    // write the data
    const flight = await flightService.createFlight(req.body);

    // return the response
    res.status(201).json({ data: flight });
  } catch (error) {
    res.status(422).json(error);
    next();
  }
}

module.exports = {
  handleSearchFlights,
  handleCreateFlight,
  handleSearchFlights,
  handleSearchReturnFlights,
};
