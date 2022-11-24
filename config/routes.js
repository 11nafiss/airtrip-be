const express = require("express");
const controllers = require("../app/controllers");

const apiRouter = express.Router();

// API List here

apiRouter.get("/", controllers.main.handleGetRoot);

module.exports = apiRouter;
