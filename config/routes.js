const express = require("express");
const controllers = require("../app/controllers");

const apiRouter = express.Router();

// API List here
// apiRouter.post("/api/login", controllers.api.v1.postController.create);

apiRouter.get("/", controllers.main.handleGetRoot);
apiRouter.post(
  "/register",
  controllers.api.v1.authenticationController.register
);

apiRouter.use(controllers.main.handleError);
module.exports = apiRouter;
