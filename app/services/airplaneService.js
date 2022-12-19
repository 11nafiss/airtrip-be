const { RecordNotFoundError } = require("../errors");
const airplaneRepository = require("../repositories/airplaneRepository");
const uploadImg = require("./utils/uploadImage");
const getAirplaneById = async (id) => {
  try {
    const airplane = await airplaneRepository.getAirplane(id);
    return airplane;
  } catch (error) {
    throw error;
  }
};

async function createAirplane(createArgs) {
  try {
    if (createArgs.image) {
      createArgs.image = await uploadImg(createArgs.image);
    } else {
      createArgs.image = null;
    }

    return await airplaneRepository.createAirplane(createArgs);
  } catch (error) {
    throw new Error(error);
  }
}

async function getAirplanes() {
  try {
    return await airplaneRepository.listAirplanes();
  } catch (error) {
    throw new Error(error);
  }
}

async function deleteAirplane(airplaneId) {
  try {
    const deletedRow = await airplaneRepository.deleteAirplane(airplaneId);
    if (deletedRow < 1) {
      return new RecordNotFoundError(`Airplane id ${airplaneId}`);
    }
    return deletedRow;
  } catch (error) {
    throw new Error(error);
  }
}

async function updateAirplane(airplaneId, updateArgs) {
  try {
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
  } catch (error) {
    throw new Error(error);
  }
}
module.exports = {
  getAirplaneById,
  createAirplane,
  getAirplanes,
  deleteAirplane,
  updateAirplane,
};
