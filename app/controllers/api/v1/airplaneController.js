const airplaneService = require("../../../services/airplaneService");

async function handleCreateAirplane(req, res, next) {
  // req.body = {image, model_number, manufacture, capacity}
  try {
    const airplane = await airplaneService.createAirplane(req.body);
    console.log(airplane);
    res
      .status(201)
      .json({ message: "Airplane created successfully!", data: airplane });
  } catch (error) {
    console.log(error);
    req.error = error;
    next();
  }
}

module.exports = {
  handleCreateAirplane,
};
