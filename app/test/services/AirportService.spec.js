const airports = require("../helper/airportsDataExample");
describe("airportService", () => {
  beforeEach(() => {
    jest.resetModules();
  });
  describe("getAirports", () => {
    it("should return airports data", async () => {
      const mockAirportRepo = {
        getAirports: jest.fn().mockReturnValue(Promise.resolve(airports)),
      };

      jest.mock("../../repositories/airportsRepository", () => mockAirportRepo);
      const airportService = require("../../services/airportService");

      const result = await airportService.getAirports();

      expect(mockAirportRepo.getAirports).toHaveBeenCalled();
      expect(result).toBe(airports);
    });
  });
  describe("getAirportById", () => {
    it("should return airport data by id", async () => {
      const id = 1;
      const airport = airports[0];
      const mockAirportRepo = {
        getAirportsById: jest.fn().mockReturnValue(Promise.resolve(airport)),
      };

      jest.mock("../../repositories/airportsRepository", () => mockAirportRepo);
      const airportService = require("../../services/airportService");

      const result = await airportService.getAirportById(id);

      expect(mockAirportRepo.getAirportsById).toHaveBeenCalledWith(id);
      expect(result).toBe(airport);
    });
  });
});
