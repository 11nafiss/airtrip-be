"use strict";

/** @type {import('sequelize-cli').Migration} */

const { randomDate } = require("../createRandomDate");
const { Airport, Airplane } = require("../../app/models");

function generateMockClass() {
  let class_id = Math.floor(Math.random() * 3 + 1);
  let mock_class = "";
  switch (class_id) {
    case 1:
      mock_class = "economy";
      break;

    case 2:
      mock_class = "bussiness";
      break;

    case 3:
      mock_class = "first";
      break;

    default:
      break;
  }
  return mock_class;
}

function randomPrice() {
  // minimal 500k
  const random = Math.floor(Math.random() * 2000 + 500);

  const sisa = random % 10;

  const price = (random - sisa) * 1000;
  return price;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    /*
      attributes = {
        departure,
        arrival,
        class,
        price,
        from,
        to,
        airplane_id,
        description
      }
    */

    const start = new Date(2022, 12, 11);
    const end = new Date(2023, 1, 31);
    const timeStamp = new Date();

    let data = [];
    for (let i = 0; i < 100; i++) {
      // create mock departure and arrival
      let date = randomDate(start, end);

      // create mock class

      let mock_class = generateMockClass();

      // create mock price
      let random_price = randomPrice();

      let lorem =
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur odio sed laborum voluptate consequatur itaque harum facilis doloremque, voluptatem dolore laboriosam, nisi architecto optio incidunt repellendus quis veniam amet id.";

      let temp = {
        departure: date.departure,
        arrival: date.arrival,
        flight_class: mock_class,
        price: random_price,
        from: Math.floor(Math.random() * 4131 + 1),
        to: Math.floor(Math.random() * 4131 + 1),
        airplane_id: Math.floor(Math.random() * 9 + 1),
        description: lorem,
        createdAt: timeStamp,
        updatedAt: timeStamp,
        deletedAt: null,
      };

      data.push(temp);
    }

    await queryInterface.bulkInsert("Flights", data, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("Flights", null, {});
  },
};
