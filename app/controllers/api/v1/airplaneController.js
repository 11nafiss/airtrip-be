const { RecordNotFoundError } = require("../../../errors");
const airplaneService = require("../../../services/airplaneService");

async function handleCreateAirplane(req, res, next) {
  // req.body = {image, model_number, manufacture, capacity}
  try {
    const airplane = await airplaneService.createAirplane(req.body);
    res
      .status(201)
      .json({ message: "Airplane created successfully!", data: airplane });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function handleGetAirplanes(req, res, next) {
  try {
    const airplanes = await airplaneService.getAirplanes();
    res.status(200).json({ data: airplanes });
  } catch (error) {
    next(error);
  }
}

async function handleDeleteAirplane(req, res, next) {
  try {
    const deleted = await airplaneService.deleteAirplane(req.params.id);

    if (deleted instanceof RecordNotFoundError) {
      return res.status(404).json({ message: deleted.message });
    }
    res
      .status(200)
      .json({ message: `Airplane id ${req.params.id} deleted successfully!` });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function handleUpdateAirplane(req, res, next) {
  try {
    // req.body = {image, model_number, manufacture, capacity}
    const updatedAirplane = await airplaneService.updateAirplane(
      req.params.id,
      req.body
    );
    if (updatedAirplane instanceof RecordNotFoundError) {
      return res.status(404).json({
        message: updatedAirplane.message,
      });
    }
    return res.status(200).json({
      message: `Airplane id ${req.params.id} updated successfully!`,
      data: updatedAirplane,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function handleGetAirplaneById(req, res, next) {
  try {
    const airplane = await airplaneService.getAirplaneById(req.params.id);
    if (airplane) {
      return res.status(200).json({ data: airplane });
    }
    res.status(404).json({
      message: new RecordNotFoundError(`Airplane id ${req.params.id}`).message,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  handleCreateAirplane,
  handleGetAirplanes,
  handleDeleteAirplane,
  handleUpdateAirplane,
  handleGetAirplaneById,
};
