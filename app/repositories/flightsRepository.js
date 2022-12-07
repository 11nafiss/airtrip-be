const { Op } = require("sequelize");
const { Flight, Airplane, Airport } = require("../models");

async function findFlights(departure_date, from, to) {
  try {
    return await Flight.findAll({
      where: {
        departure_date,
        from,
        to,
      },
      include: [
        {
          model: Airport,
          as: "from_airport",
        },
        {
          model: Airport,
          as: "to_airport",
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
