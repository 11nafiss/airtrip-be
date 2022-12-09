describe("AirportRepository", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe("getAirports", () => {
    it("should return all airports", async () => {
      const airports = require("../helper/airportsDataExample");
      const mockAirportModel = {
        findAll: jest.fn().mockReturnValue(airports),
      };

      jest.mock("../../models", () => {
        return { Airport: mockAirportModel };
      });
      const airportRepository = require("../../repositories/airportsRepository");

      const result = await airportRepository.getAirports();

      expect(mockAirportModel.findAll).toHaveBeenCalledWith({
        attributes: ["id", "iata", "name", "location"],
      });
      expect(result).toBe(airports);
    });
  });
});
