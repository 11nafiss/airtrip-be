const express = require("express");
const controllers = require("../app/controllers");

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
apiRouter.post(
  "/flights/search",
  controllers.api.v1.flightController.handleSearchFlights
);
apiRouter.post(
  "/flights/search-return",
  controllers.api.v1.flightController.handleSearchReturnFlights
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
