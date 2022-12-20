const airportService = require("../../../services/airportService");

async function handleGetAirports(req, res, next) {
  try {
    const airports = await airportService.getAirports();
    res.status(200).json({ data: airports });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  handleGetAirports,
};
