const { Flight, Airplane, Airport } = require("../models");
const { Op } = require("sequelize");
const airportRequiredAttributes = [
  "id",
  "iata",
  "name",
  "address",
  "country_code",
];

async function list() {
  const fligts = await Flight.findAll({
    attributes: {
      exclude: ["from", "to", "airplane_id"],
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
      { model: Airplane, as: "airplane" },
    ],
  });
  return fligts;
}

async function findFlights(departureDate, from, to, flightClass) {
  return await Flight.findAll({
    attributes: {
      exclude: ["from", "to", "airplane_id"],
    },
    where: {
      departure: {
        [Op.gte]: departureDate,
      },
      from,
      to,
      flight_class: flightClass,
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
      { model: Airplane, as: "airplane" },
    ],
  });
}

async function findReturnFlights(
  returnFlightDate,
  arrivalDate,
  from,
  to,
  flightClass
) {
  return await Flight.findAll({
    attributes: {
      exclude: ["from", "to", "airplane_id"],
    },
    where: {
      departure: {
        [Op.gte]: returnFlightDate,
        [Op.gt]: arrivalDate,
      },
      from: to,
      to: from,

      flight_class: flightClass,
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
      { model: Airplane, as: "airplane" },
    ],
  });
}

async function createFlight(body) {
  const flight = await Flight.create(body);
  return flight;
}

async function updateFlight(id, updateArgs) {
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
      { model: Airplane, as: "airplane" },
    ],
  });

  return flight[1];
}

async function getFlightById(id) {
  const flight = await Flight.findByPk(id, {
    attributes: {
      exclude: ["from", "to", "airplane_id"],
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
      { model: Airplane, as: "airplane" },
    ],
  });
  return flight;
}

async function deleteFlight(id) {
  const flight = await Flight.destroy({ where: { id: id } });
  return flight;
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
