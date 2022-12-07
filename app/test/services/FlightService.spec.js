const flights = require("../helper/flightsDataExample");

describe("flightService", () => {
  describe("searchFlights", () => {
    it("should return flights data", async () => {
      const mockFlightRepo = {
        findFlights: jest.fn().mockReturnValue(Promise.resolve(flights)),
      };
      jest.mock("../../repositories/flightsRepository", () => mockFlightRepo);
      const flightService = require("../../services/flightService");

      const searchParams = {
        departure_date: new Date().toISOString(),
        from: 1,
        to: 2,
      };

      const result = await flightService.searchFlights(searchParams);

      expect(mockFlightRepo.findFlights).toHaveBeenCalledWith(
        new Date(searchParams.departure_date),
        searchParams.from,
        searchParams.to
      );
      expect(result).toBe(flights);
    });
  });
});
