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
  upload.single("image"),
  controllers.api.v1.userController.handleUpdateUser
);
apiRouter.post(
  "/flights/search",
  controllers.api.v1.flightController.handleSearchFlights
);

apiRouter.get(
  "/airports",
  controllers.api.v1.airportController.handleGetAirports
);

apiRouter.post(
  "/createFlight",
  controllers.api.v1.authenticationController.authorize("ADMIN"),
  controllers.api.v1.flightController.handleCreateFlight
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
