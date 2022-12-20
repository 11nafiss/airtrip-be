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

async function listAirplanes() {
  try {
    return await Airplane.findAll();
  } catch (error) {
    throw new Error(error);
  }
}

async function deleteAirplane(airplaneId) {
  try {
    return await Airplane.destroy({ where: { id: airplaneId } });
  } catch (error) {
    throw new Error(error);
  }
}

async function updateAirplane(airplaneId, updateArgs) {
  try {
    const updatedAirplane = await Airplane.update(updateArgs, {
      where: { id: airplaneId },
      returning: true,
    });

    return updatedAirplane[1];
  } catch (error) {
    throw new Error(error);
  }
}
module.exports = {
  getAirplane,
  createAirplane,
  listAirplanes,
  deleteAirplane,
  updateAirplane,
};
