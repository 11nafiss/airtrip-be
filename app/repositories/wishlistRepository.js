const { Wishlist, Flight, Airport } = require("../models");
const aiportFields = ["id", "iata", "name", "address"];

async function create(userId, flightId) {
  return await Wishlist.create({ user_id: userId, flight_id: flightId });
}

async function list(userId) {
  return await Wishlist.findAll({
    attributes: { exclude: ["flight_id"] },
    where: {
      user_id: userId,
    },
    include: [
      {
        model: Flight,
        as: "flight",
        attributes: { exclude: ["from", "to"] },
        include: [
          {
            model: Airport,
            as: "from_airport",
            attributes: aiportFields,
          },
          {
            model: Airport,
            as: "to_airport",
            attributes: aiportFields,
          },
        ],
      },
    ],
    order: [["createdAt", "DESC"]],
  });
}

module.exports = {
  create,
  list,
};
