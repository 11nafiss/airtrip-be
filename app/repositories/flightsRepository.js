const { Op } = require("sequelize");
const { Flight } = require("../models");

async function findFlights(departure_date, from, to) {
  return await Flight.findAll({
    where: {
      departure_date: {
        [Op.gte]: departure_date,
      },
      from,
      to,
    },
  });
}

module.exports = {
  findFlights,
};
