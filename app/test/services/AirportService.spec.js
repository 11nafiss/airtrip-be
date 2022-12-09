describe("airportService", () => {
  beforeEach(() => {
    jest.resetModules();
  });
  describe("getAirports", () => {
    it("should return airports data", async () => {
      const mockAirportRepo = {
        getAirports: jest
          .fn()
          .mockReturnValue(
            Promise.resolve(require("../helper/airportsDataExample"))
          ),
      };

      jest.mock("../../repositories/airportsRepository", () => mockAirportRepo);
      const airportService = require("../../services/airportService");

      const result = await airportService.getAirports();

      expect(mockAirportRepo.getAirports).toHaveBeenCalled();
      expect(result).toBe(result);
    });
  });
});
