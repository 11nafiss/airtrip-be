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

module.exports = {
  getAirplaneById,
  createAirplane,
};
