const flightService = require("../../../services/flightService");
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
module.exports = { handleSearchFlights, handleSearchReturnFlights };
