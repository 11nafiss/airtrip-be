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
        flight_date: new Date(),
        from: 1,
        to: 2,
        flight_class: "economy",
      };
      const result = await flightsRepository.findFlights(
        searchParams.flight_date,
        searchParams.from,
        searchParams.to,
        searchParams.flight_class
      );

      expect(mockFlightModel.findAll).toHaveBeenCalledWith({
        where: {
          departure: {
            [Op.gte]: searchParams.flight_date,
          },
          from: searchParams.from,
          to: searchParams.to,
          class: searchParams.flight_class,
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
        flight_date: new Date(),
        return_flight_date: new Date().setDate(new Date().getDate() + 1),
        from: 1,
        to: 2,
        flight_class: "economy",
      };
      const result = await flightsRepository.findReturnFlights(
        searchParams.flight_date,
        searchParams.return_flight_date,
        searchParams.from,
        searchParams.to,
        searchParams.flight_class
      );

      expect(mockFlightModel.findAll).toHaveBeenCalledWith({
        where: {
          departure: {
            [Op.gte]: searchParams.return_flight_date,
            [Op.gt]: searchParams.flight_date,
          },
          from: searchParams.to,
          to: searchParams.from,
          class: searchParams.flight_class,
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
