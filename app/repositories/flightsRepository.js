const { Op } = require("sequelize");
const { Flight, Airplane, Airport } = require("../models");

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
      include: [
        {
          model: Airport,
          as: "from",
        },
        {
          model: Airport,
          as: "to",
        },
        { model: Airplane },
      ],
    });
  } catch (error) {
    throw error;
  }
}

module.exports = {
  findFlights,
};
