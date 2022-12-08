const { Flight, Airplane, Airport } = require("../models");

async function findFlights(departure, from, to) {
  const airportRequiredAttributes = ["id", "iata", "name", "address"];
  try {
    return await Flight.findAll({
      where: {
        departure,
        from,
        to,
      },
      include: [
        {
          model: Airport,
          as: "from_airport",
          attributes: airportRequiredAttributes,
        },
        {
          model: Airport,
          as: "to_airport",
          attributes: airportRequiredAttributes,
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
