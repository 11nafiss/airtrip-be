describe("flightsRepository", () => {
  beforeEach(() => {
    jest.resetModules();
  });
  describe("findFlights", () => {
    it("should return flights data based on search parameters", async () => {
      const flights = require("../helper/flightsDataExample");

      const mockFlightModel = {
        findAll: jest.fn().mockReturnValue(flights),
      };

      jest.mock("../../models", () => {
        return { Flight: mockFlightModel, Airport: {}, Airplane: {} };
      });
      const { Airport, Airplane } = require("../../models");
      const flightsRepository = require("../../repositories/flightsRepository");

      const searchParams = {
        departure: new Date(),
        from: 1,
        to: 2,
      };
      const result = await flightsRepository.findFlights(
        searchParams.departure,
        searchParams.from,
        searchParams.to
      );

      const airportRequiredAttributes = ["id", "iata", "name", "address"];
      expect(mockFlightModel.findAll).toHaveBeenCalledWith({
        where: {
          departure: searchParams.departure,
          from: searchParams.from,
          to: searchParams.to,
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
