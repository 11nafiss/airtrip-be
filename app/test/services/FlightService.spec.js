const flights = require("../helper/flightsDataExample");

describe("flightService", () => {
  beforeEach(() => {
    jest.resetModules();
  });
  describe("searchFlights", () => {
    it("should return flights data", async () => {
      const mockFlightRepo = {
        findFlights: jest.fn().mockReturnValue(Promise.resolve(flights)),
      };
      jest.mock("../../repositories/flightsRepository", () => mockFlightRepo);
      const flightService = require("../../services/flightService");

      const searchParams = {
        from: 1,
        to: 2,
        departureDate: new Date().toISOString(),
        flightClass: "economy",
      };

      const result = await flightService.searchFlights(searchParams);

      expect(mockFlightRepo.findFlights).toHaveBeenCalledWith(
        new Date(searchParams.departureDate),
        searchParams.from,
        searchParams.to,
        searchParams.flightClass
      );
      expect(result).toBe(flights);
    });
  });

  describe("searchReturnFlights", () => {
    it("return flights data", async () => {
      const mockFlightRepo = {
        findReturnFlights: jest.fn().mockReturnValue(Promise.resolve(flights)),
      };
      jest.mock("../../repositories/flightsRepository", () => mockFlightRepo);
      const flightService = require("../../services/flightService");

      const searchParams = {
        from: 1,
        to: 2,
        returnFlightDate: new Date().toISOString(),
        arrivalDate: new Date().toISOString(),
        flightClass: "economy",
      };

      const result = await flightService.searchReturnFlights(searchParams);

      expect(mockFlightRepo.findReturnFlights).toHaveBeenCalledWith(
        new Date(searchParams.returnFlightDate),
        new Date(searchParams.arrivalDate),

        searchParams.from,
        searchParams.to,
        searchParams.flightClass
      );
      expect(result).toBe(flights);
    });
  });
});
