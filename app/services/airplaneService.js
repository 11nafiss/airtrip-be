const airplaneRepository = require("../repositories/airplaneRepository");

const getAirplaneById = async (id) => {
  try {
    const airplane = await airplaneRepository.getAirplane(id);
    return airplane;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAirplaneById
}
