const { Airplane } = require("../models");

const getAirplane = async (id) => {
  try {
    const airplane = await Airplane.findByPk(id);
    return airplane;
  } catch (error) {
    throw new Error(error);
  }
};
async function createAirplane(createArgs) {
  try {
    return await Airplane.create(createArgs, { returning: true });
  } catch (error) {
    throw new Error(error);
  }
}
module.exports = {
  getAirplane,
  createAirplane,
};
