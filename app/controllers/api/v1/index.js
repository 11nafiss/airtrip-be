// export controller here
const authenticationController = require("./authenticationController");
const flightController = require("./flightController");
const airportController = require("./airportController");
const userController = require("./userController");
const ticketController = require("./ticketController");
module.exports = {
  authenticationController,
  flightController,
  airportController,
  userController,
  ticketController,
};
