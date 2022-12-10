const { Airplane } = require("../models");

const getAirplane = async (id) => {
  try {
    const airplane = await Airplane.findByPk(id);
    return airplane;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAirplane,
};
