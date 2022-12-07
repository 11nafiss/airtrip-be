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
        departure_date: new Date(),
        from: 1,
        to: 2,
      };
      const result = await flightsRepository.findFlights(
        searchParams.departure_date,
        searchParams.from,
        searchParams.to
      );

      expect(mockFlightModel.findAll).toHaveBeenCalledWith({
        where: {
          departure_date: searchParams.departure_date,
          from: searchParams.from,
          to: searchParams.to,
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
      expect(result).toBe(flights);
    });
  });
});
