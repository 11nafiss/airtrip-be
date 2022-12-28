const { RecordNotFoundError } = require("../errors");
const airplaneRepository = require("../repositories/airplaneRepository");
const uploadImg = require("./utils/uploadImage");
const getAirplaneById = async (id) => {
  const airplane = await airplaneRepository.getAirplane(id);
  return airplane;
};

async function createAirplane(createArgs) {
  if (createArgs.image) {
    createArgs.image = await uploadImg(createArgs.image);
  } else {
    createArgs.image = null;
  }

  return await airplaneRepository.createAirplane(createArgs);
}

async function getAirplanes() {
  return await airplaneRepository.listAirplanes();
}

async function deleteAirplane(airplaneId) {
  const deletedRow = await airplaneRepository.deleteAirplane(airplaneId);
  if (deletedRow < 1) {
    return new RecordNotFoundError(`Airplane id ${airplaneId}`);
  }
  return deletedRow;
}

async function updateAirplane(airplaneId, updateArgs) {
  if (updateArgs.image) {
    updateArgs.image = await uploadImg(updateArgs.image);
  } else {
    delete updateArgs.image;
  }
  const updatedAirplane = await airplaneRepository.updateAirplane(
    airplaneId,
    updateArgs
  );

  if (updatedAirplane.length < 1) {
    return new RecordNotFoundError(`Airplane id ${airplaneId}`);
  }
  return updatedAirplane[0];
}
module.exports = {
  getAirplaneById,
  createAirplane,
  getAirplanes,
  deleteAirplane,
  updateAirplane,
};
