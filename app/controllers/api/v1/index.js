// export controller here
const authenticationController = require("./authenticationController");
const flightController = require("./flightController");
const airportController = require("./airportController");
const userController = require("./userController");
module.exports = {
  authenticationController,
  flightController,
  airportController,
  userController,
};
