// export controller here
const authenticationController = require("./authenticationController");
const flightController = require("./flightController");
const airportController = require("./airportController");
const userController = require("./userController");
const ticketController = require("./ticketController");
const airplaneController = require("./airplaneController");
const notificationController = require("./notificationController");
const wishlistController = require("./wishlistController");

module.exports = {
  wishlistController,
  authenticationController,
  flightController,
  airportController,
  userController,
  ticketController,
  airplaneController,
  notificationController,
};
