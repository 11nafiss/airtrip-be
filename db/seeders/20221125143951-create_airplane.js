"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const timestamp = new Date();

    const records = [
      {
        image:
          "https://aircraft.web.factory.eu.airbus.com/sites/g/files/jlcbta126/files/2022-11/A220-300-resized-side-view.png",
        model_number: "A220",
        manufacture: "Airbus",
        capacity: 130,
        specs: ["2 engines", "single aisle", "originally Bombardier CSeries"],
        createdAt: timestamp,
        updatedAt: timestamp,
        deletedAt: null,
      },
      {
        image:
          "https://aircraft.web.factory.eu.airbus.com/sites/g/files/jlcbta126/files/2022-11/A320neo-resized-side-view.png",
        model_number: "A320",
        manufacture: "Airbus",
        capacity: 150,
        specs: ["2 engines", "single aisle"],
        createdAt: timestamp,
        updatedAt: timestamp,
        deletedAt: null,
      },
      {
        image:
          "https://aircraft.web.factory.eu.airbus.com/sites/g/files/jlcbta126/files/2022-11/A330-900-resized-side-view.png",
        model_number: "A330",
        manufacture: "Airbus",
        capacity: 300,
        specs: ["2 engines", "twin aisle"],
        createdAt: timestamp,
        updatedAt: timestamp,
        deletedAt: null,
      },
      {
        image:
          "https://aircraft.web.factory.eu.airbus.com/sites/g/files/jlcbta126/files/2022-11/A350-1000-resized-side-view.png",
        model_number: "A350",
        manufacture: "Airbus",
        capacity: 350,
        specs: ["2 engines", "twin aisle"],
        createdAt: timestamp,
        updatedAt: timestamp,
        deletedAt: null,
      },
      {
        image:
          "https://www.boeing.com/resources/boeingdotcom/commercial/assets/images/current-products/737max.jpg",
        model_number: "737",
        manufacture: "Boeing",
        capacity: 215,
        specs: [
          "Twin‑engine",
          "single aisle",
          "short- to medium-range",
          "narrow-body",
        ],
        createdAt: timestamp,
        updatedAt: timestamp,
        deletedAt: null,
      },
      {
        image:
          "https://www.boeing.com/resources/boeingdotcom/commercial/assets/images/current-products/747-8.jpg",
        model_number: "747",
        manufacture: "Boeing",
        capacity: 605,
        specs: [
          "Heavy",
          "four‑engine",
          "partial double deck",
          "twin–aisle main deck",
          "single–aisle upper deck",
          "medium to long-range",
          "widebody",
        ],
        createdAt: timestamp,
        updatedAt: timestamp,
        deletedAt: null,
      },
      {
        image:
          "https://www.boeing.com/resources/boeingdotcom/commercial/assets/images/current-products/767.jpg",
        model_number: "767",
        manufacture: "Boeing",
        capacity: 375,
        specs: [
          "Heavy",
          "twin-engine",
          "twin aisle",
          "medium to long-range",
          "widebody",
        ],
        createdAt: timestamp,
        updatedAt: timestamp,
        deletedAt: null,
      },
      {
        image:
          "https://www.boeing.com/resources/boeingdotcom/commercial/assets/images/current-products/777.jpg",
        model_number: "777",
        manufacture: "Boeing",
        capacity: 550,
        specs: [
          "Heavy",
          "twin-engine",
          "twin aisle",
          "medium to long-range",
          "ultra long-range (200LR)",
          "widebody",
        ],
        createdAt: timestamp,
        updatedAt: timestamp,
        deletedAt: null,
      },
      {
        image:
          "https://www.boeing.com/resources/boeingdotcom/commercial/assets/images/current-products/787.jpg",
        model_number: "787",
        manufacture: "Boeing",
        capacity: 330,
        specs: ["Heavy", "twin-engine", "twin aisle", "long-range", "widebody"],
        createdAt: timestamp,
        updatedAt: timestamp,
        deletedAt: null,
      },
    ];

    await queryInterface.bulkInsert("Airplanes", records, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Airplanes", null, {});
  },
};
