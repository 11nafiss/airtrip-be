const flightService = require("../../../services/flightService");
async function handleSearchFlights(req, res, next) {
  try {
    const flights = await flightService.searchFlights(req.body);
    res.status(200).json({ data: flights });
  } catch (error) {
    req.error = error;
    next();
  }
}

module.exports = { handleSearchFlights };
