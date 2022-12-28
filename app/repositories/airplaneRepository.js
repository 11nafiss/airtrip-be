const { Airplane } = require("../models");

const getAirplane = async (id) => {
  const airplane = await Airplane.findByPk(id);
  return airplane;
};

async function createAirplane(createArgs) {
  return await Airplane.create(createArgs, { returning: true });
}

async function listAirplanes() {
  return await Airplane.findAll();
}

async function deleteAirplane(airplaneId) {
  return await Airplane.destroy({ where: { id: airplaneId } });
}

async function updateAirplane(airplaneId, updateArgs) {
  const updatedAirplane = await Airplane.update(updateArgs, {
    where: { id: airplaneId },
    returning: true,
  });

  return updatedAirplane[1];
}
module.exports = {
  getAirplane,
  createAirplane,
  listAirplanes,
  deleteAirplane,
  updateAirplane,
};
