const express = require("express");
const controllers = require("../app/controllers");
const upload = require("./multer");
const apiRouter = express.Router();

const Roles = {
  ADMIN: "ADMIN",
  BUYER: "BUYER",
};

// API List here
apiRouter.get("/", controllers.main.handleGetRoot);
apiRouter.post(
  "/register",
  controllers.api.v1.authenticationController.register
);

apiRouter.post("/login", controllers.api.v1.authenticationController.login);
apiRouter.put(
  "/users/update/:id",
  controllers.api.v1.authenticationController.authorize(Roles.BUYER),
  controllers.api.v1.userController.handleUpdateUser
);
apiRouter.get(
  "/whoami",
  controllers.api.v1.authenticationController.authorize(true),
  controllers.api.v1.userController.handleWhoami
);
apiRouter.post(
  "/flights/search",
  controllers.api.v1.flightController.handleSearchFlights
);
apiRouter.post(
  "/flights/search-return",
  controllers.api.v1.flightController.handleSearchReturnFlights
);

apiRouter.get(
  "/airports",
  controllers.api.v1.airportController.handleGetAirports
);

// create flight data
apiRouter.post(
  "/flights/create",
  controllers.api.v1.authenticationController.authorize("ADMIN"),
  controllers.api.v1.flightController.handleCreateFlight
);

// get all flight data
apiRouter.get(
  "/flights",
  controllers.api.v1.flightController.handleListFlights
);

// update flight data
apiRouter.put(
  "/flights/update/:id",
  controllers.api.v1.authenticationController.authorize("ADMIN"),
  controllers.api.v1.flightController.handleUpdateFlight
);

// delete flight data
apiRouter.delete(
  "/flights/delete/:id",
  controllers.api.v1.authenticationController.authorize("ADMIN"),
  controllers.api.v1.flightController.handleDeleteFlight
);

apiRouter.post(
  "/tickets/create",
  controllers.api.v1.authenticationController.authorize(Roles.BUYER),
  controllers.api.v1.ticketController.handleCreateTicket
);

apiRouter.get(
  "/tickets/history",
  controllers.api.v1.authenticationController.authorize(Roles.BUYER),
  controllers.api.v1.ticketController.handleTicketHistory
);

apiRouter.get(
  "/tickets",
  controllers.api.v1.authenticationController.authorize(Roles.ADMIN),
  controllers.api.v1.ticketController.handleGetTickets
);

apiRouter.post(
  "/airplane/create",
  controllers.api.v1.authenticationController.authorize(Roles.ADMIN),
  controllers.api.v1.airplaneController.handleCreateAirplane
);

// for authorization testing purpose only
if (process.env.NODE_ENV !== "production") {
  apiRouter.post(
    "/authorize",
    controllers.api.v1.authenticationController.authorize(Roles.BUYER),
    (req, res) => {
      return res.json(req.user);
    }
  );
}

apiRouter.use(controllers.main.handleError);
module.exports = apiRouter;
