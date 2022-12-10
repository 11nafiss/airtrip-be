describe("flightsRepository", () => {
  beforeEach(() => {
    jest.resetModules();
  });
  const airportRequiredAttributes = [
    "id",
    "iata",
    "name",
    "address",
    "country_code",
  ];

  describe("findFlights", () => {
    it("should return flights data", async () => {
      const flights = require("../helper/flightsDataExample");

      const mockFlightModel = {
        findAll: jest.fn().mockReturnValue(flights),
      };

      jest.mock("../../models", () => {
        return { Flight: mockFlightModel, Airport: {}, Airplane: {} };
      });
      const { Airport, Airplane } = require("../../models");
      const flightsRepository = require("../../repositories/flightsRepository");
      const { Op } = require("sequelize");
      const searchParams = {
        departureDate: new Date(),
        from: 1,
        to: 2,
        flightClass: "economy",
      };
      const result = await flightsRepository.findFlights(
        searchParams.departureDate,
        searchParams.from,
        searchParams.to,
        searchParams.flightClass
      );

      expect(mockFlightModel.findAll).toHaveBeenCalledWith({
        where: {
          departure: {
            [Op.gte]: searchParams.departureDate,
          },
          from: searchParams.from,
          to: searchParams.to,
          class: searchParams.flightClass,
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
      expect(result).toBe(flights);
    });
  });

  describe("findReturnFlights", () => {
    it("should return flights data", async () => {
      const flights = require("../helper/flightsDataExample");

      const mockFlightModel = {
        findAll: jest.fn().mockReturnValue(flights),
      };

      jest.mock("../../models", () => {
        return { Flight: mockFlightModel, Airport: {}, Airplane: {} };
      });
      const { Airport, Airplane } = require("../../models");
      const flightsRepository = require("../../repositories/flightsRepository");
      const { Op } = require("sequelize");
      const searchParams = {
        returnFlightDate: new Date(),
        arrivalDate: new Date(),
        from: 1,
        to: 2,
        flightClass: "economy",
      };
      const result = await flightsRepository.findReturnFlights(
        searchParams.returnFlightDate,
        searchParams.arrivalDate,
        searchParams.from,
        searchParams.to,
        searchParams.flightClass
      );

      expect(mockFlightModel.findAll).toHaveBeenCalledWith({
        where: {
          departure: {
            [Op.gte]: searchParams.returnFlightDate,
            [Op.gt]: searchParams.arrivalDate,
          },
          from: searchParams.to,
          to: searchParams.from,
          class: searchParams.flightClass,
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
      expect(result).toBe(flights);
    });
  });
});
