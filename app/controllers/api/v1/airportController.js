const airportService = require("../../../services/airportService");

async function handleGetAirports(req, res, next) {
  try {
    const airports = await airportService.getAirports();
    res.status(200).json({ data: airports });
  } catch (error) {
    next(error);
  }
}
async function handleGetAirportById(req, res, next) {
  try {
    const airport = await airportService.getAirportById(req.params.id);
    res.status(200).json({ data: airport });
  } catch (error) {
    next(error);
  }
}
module.exports = {
  handleGetAirports,
  handleGetAirportById,
};
