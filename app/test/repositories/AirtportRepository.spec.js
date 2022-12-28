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
        attributes: ["id", "iata", "name", "address"],
      });
      expect(result).toBe(airports);
    });
  });

  describe("getAirportsById", () => {
    it("should return airport by id", async () => {
      const airport = require("../helper/airportsDataExample");
      [0];
      const id = 1;
      const mockAirportModel = {
        findByPk: jest.fn().mockReturnValue(airport),
      };

      jest.mock("../../models", () => {
        return { Airport: mockAirportModel };
      });
      const airportRepository = require("../../repositories/airportsRepository");

      const result = await airportRepository.getAirportsById(id);

      expect(mockAirportModel.findByPk).toHaveBeenCalledWith(id, {
        attributes: ["id", "iata", "name", "address"],
      });
      expect(result).toBe(airport);
    });
  });
});
