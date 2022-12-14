const { Flight, Airplane, Airport } = require("../models");
const { Op, fn } = require("sequelize");
const airportRequiredAttributes = [
  "id",
  "iata",
  "name",
  "address",
  "country_code",
];

async function list() {
  try {
    const fligts = await Flight.findAll({
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
    return fligts;
  } catch (error) {
    throw error;
  }
}

async function findFlights(flight_date, from, to, flight_class) {
  try {
    return await Flight.findAll({
      where: {
        departure: {
          [Op.gte]: flight_date,
        },
        from,
        to,
        flight_class: flight_class,
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

async function findReturnFlights(
  flight_date,
  return_flight_date,
  from,
  to,
  flight_class
) {
  try {
    return await Flight.findAll({
      where: {
        departure: {
          [Op.gte]: return_flight_date,
          [Op.gt]: flight_date,
        },
        from: to,
        to: from,
        flight_class: flight_class,
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

async function createFlight(body) {
  try {
    const flight = await Flight.create(body);
    return flight;
  } catch (error) {
    throw error;
  }
}

async function updateFlight(id, updateArgs) {
  try {
    const flight = await Flight.update(updateArgs, {
      where: { id: id },
      returning: true,
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

    return flight[1];
  } catch (error) {
    throw error;
  }
}

async function getFlightById(id) {
  try {
    const flight = await Flight.findByPk(id, {
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
    return flight;
  } catch (error) {
    throw error;
  }
}

async function deleteFlight(id) {
  try {
    const flight = await Flight.destroy({ where: { id: id } });
    return flight;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  list,
  getFlightById,
  findFlights,
  findReturnFlights,
  createFlight,
  updateFlight,
  deleteFlight,
};
