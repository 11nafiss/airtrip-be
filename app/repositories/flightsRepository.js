const { Op } = require("sequelize");
const { Flight } = require("../models");

async function findFlights(departure_date, from, to) {
  try {
    return await Flight.findAll({
      where: {
        departure_date: {
          [Op.gte]: departure_date,
        },
        from,
        to,
      },
    });
  } catch (error) {
    throw error;
  }
}

module.exports = {
  findFlights,
};
