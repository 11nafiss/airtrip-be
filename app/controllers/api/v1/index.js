// export controller here
const authenticationController = require("./authenticationController");
const flightController = require("./flightController");
const airportController = require("./airportController");
const userController = require("./userController");
const ticketController = require("./ticketController");
const airplaneController = require("./airplaneController");
const notificationController = require("./notificationController");
module.exports = {
  authenticationController,
  flightController,
  airportController,
  userController,
  ticketController,
  airplaneController,
  notificationController,
};
