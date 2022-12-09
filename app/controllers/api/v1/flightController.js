const flightService = require("../../../services/flightService");
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

module.exports = { handleSearchFlights };
